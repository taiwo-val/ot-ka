import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";

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

    const photo = await prisma.photo.update({
      where: { id },
      data: {
        title: body.title,
        match: body.match,
        homeTeam: body.homeTeam,
        awayTeam: body.awayTeam,
        player: body.player,
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
  request: NextRequest,
  { params }: Params
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

    // Delete image from Supabase Storage
if (photo.storagePath) {
  const { error } = await supabase.storage
    .from("photos")
    .remove([photo.storagePath]);

  if (error) {
    console.error("Storage delete error:", error);
  }
}

// Delete the database record
await prisma.photo.delete({
  where: { id },
});

    return NextResponse.json({
      success: true,
      message: "Photo deleted successfully.",
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