import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const session = await getServerSession(authOptions);

if (!session?.user?.email) {
  return NextResponse.json(
    {
      success: false,
      message: "Please login to download photos.",
    },
    { status: 401 }
  );
}

  try {
    const { id } = await params;

    const photo = await prisma.photo.findUnique({
      where: { id },
    });

    const user = await prisma.user.findUnique({
  where: {
    email: session.user.email,
  },
});

if (!user) {
  return NextResponse.json(
    {
      success: false,
      message: "User not found.",
    },
    { status: 404 }
  );
}

    if (!photo) {
      return NextResponse.json(
        {
          success: false,
          message: "Photo not found.",
        },
        { status: 404 }
      );
    }

    await prisma.photo.update({
      where: { id },
      data: {
        downloadCount: {
          increment: 1,
        },
      },
    });

    await prisma.download.create({
  data: {
    userId: user.id,
    photoId: photo.id,
  },
});


    return NextResponse.json({
      success: true,
      image: photo.image,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Download failed.",
      },
      { status: 500 }
    );
  }
}