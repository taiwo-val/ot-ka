"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function PhotoPreview({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Image
        src={image}
        alt={title}
        width={80}
        height={60}
        className="rounded cursor-pointer object-cover"
        onClick={() => setOpen(true)}
      />

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[
          {
            src: image,
          },
        ]}
      />
    </>
  );
}