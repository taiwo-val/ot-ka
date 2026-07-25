import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const photo = await prisma.photo.update({
      where: { id },
      data: {
        title: body.title,
        match: body.match,
        homeTeam: body.homeTeam,
        awayTeam: body.awayTeam,
        player: body.player || null,
        category: body.category,
        featured: body.featured,
      },
    });

    return NextResponse.json({
      success: true,
      photo,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update photo.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const photo = await prisma.photo.findUnique({
      where: { id },
    });

    if (!photo) {
      return NextResponse.json(
        {
          success: false,
          message: "Photo not found.",
        },
        { status: 404 }
      );
    }

    const { error } = await supabaseAdmin.storage
      .from("photos")
      .remove([photo.storagePath]);

    if (error) {
      console.error(error);
    }

    await prisma.photo.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete photo.",
      },
      { status: 500 }
    );
  }
}