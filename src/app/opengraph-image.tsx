import { ImageResponse } from 'next/og';

export const alt = 'Dumindu Dissanayake — Full Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const PRIMARY = '#FF6B00';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#000000',
          position: 'relative',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Orange glow accent */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-200px',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${PRIMARY}55 0%, transparent 70%)`,
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 28,
            letterSpacing: '0.35em',
            color: PRIMARY,
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          FULL STACK DEVELOPER
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 110,
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}
        >
          <span>DUMINDU</span>
          <span style={{ color: '#8a8a8a' }}>DISSANAYAKE</span>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 34,
            color: '#a3a3a3',
            marginTop: 40,
            fontWeight: 400,
          }}
        >
          Building the future at&nbsp;<span style={{ color: '#ffffff' }}>HashBaze</span>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: 80,
            right: 80,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 26,
          }}
        >
          <div style={{ display: 'flex', color: PRIMARY, fontWeight: 700 }}>dumindu.me</div>
          <div style={{ display: 'flex', color: '#6b6b6b', fontWeight: 500 }}>
            React · Next.js · TypeScript · Java
          </div>
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '8px',
            background: PRIMARY,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
