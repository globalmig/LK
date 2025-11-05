import React from 'react'

export default function Work02() {
  return (
    const ServiceSection = ({ title, subtitle, imgSrc, list }: any) => (
  <section className="pt-10 mb-32 max-w-[1440px] mx-auto flex flex-col gap-20">
    <div className="px-4">
      <div className="border-l-8 border-sky-700 my-0 md:my-20 pl-8">
        <h2>{title}</h2>
        <p className="text-black/50">{subtitle}</p>
      </div>

      <div className="relative w-full h-[450px] md:h-[600px]">
        <Image src={imgSrc} alt={title} fill quality={100} className="object-contain" />
      </div>
    </div>

    <ul className="border-2 p-10 md:px-24 my-10 rounded-xl list-disc leading-loose gap-6 flex flex-col break-keep">
      {list.map((item: string, i: number) => <li key={i}>{item}</li>)}
    </ul>
  </section>
);

  )
}
