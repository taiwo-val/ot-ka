import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const photo = await prisma.photo.create({
      data: {
        title: body.title,
        image: body.image,
        storagePath: body.storagePath,
        match: body.match,
        homeTeam: body.homeTeam,
        awayTeam: body.awayTeam,
        player: body.player || null,
        category: body.category,
        date: new Date(body.date),
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
        message: "Failed to save photo.",
      },
      { status: 500 }
    );
  }
}