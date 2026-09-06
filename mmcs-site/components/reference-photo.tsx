import Image from 'next/image';
const regions = {
  landscape: { x: 485, y: 64, w: 339, h: 297 },
  about: { x: 44, y: 494, w: 274, h: 236 },
  nokma: { x: 349, y: 824, w: 151, h: 186 },
  megh: { x: 767, y: 824, w: 198, h: 187 },
  farming: { x: 57, y: 1084, w: 133, h: 68 },
  processing: { x: 213, y: 1084, w: 134, h: 68 },
  women: { x: 368, y: 1084, w: 133, h: 68 },
  training: { x: 524, y: 1084, w: 132, h: 68 },
  household: { x: 679, y: 1084, w: 132, h: 68 },
  attire: { x: 835, y: 1084, w: 132, h: 68 },
};
/** Viewport crops of the user's supplied design reference; the file stays unchanged. */
export function ReferencePhoto({
  region,
  className = '',
}: {
  region: keyof typeof regions;
  className?: string;
}) {
  const r = regions[region];
  return (
    <div className={`reference-photo ${className}`}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <Image
          src="/images/design-reference.jpg"
          alt={`Illustrative ${region} image from the supplied design reference`}
          width={1024}
          height={1536}
          unoptimized
          style={{
            position: 'absolute',
            width: `${(1024 / r.w) * 100}%`,
            maxWidth: 'none',
            height: `${(1536 / r.h) * 100}%`,
            left: `${(-r.x / r.w) * 100}%`,
            top: `${(-r.y / r.h) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
