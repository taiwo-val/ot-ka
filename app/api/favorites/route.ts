import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { photoId } = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_photoId: {
          userId: user.id,
          photoId,
        },
      },
    });

    if (favorite) {
      await prisma.favorite.delete({
        where: {
          id: favorite.id,
        },
      });

      return NextResponse.json({
        success: true,
        favorited: false,
      });
    }

    await prisma.favorite.create({
      data: {
        userId: user.id,
        photoId,
      },
    });

    return NextResponse.json({
      success: true,
      favorited: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}