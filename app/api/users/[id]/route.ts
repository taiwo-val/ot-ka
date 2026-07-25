import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const user = await prisma.user.update({
      where: { id },
      data: {
        role: body.role,
      },
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update role.",
      },
      { status: 500 }
    );
  }
}