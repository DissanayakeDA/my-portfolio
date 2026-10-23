import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111010',
          fontFamily: 'sans-serif',
          fontWeight: 900,
          fontSize: 96,
          letterSpacing: '-6px',
        }}
      >
        <span style={{ color: '#ffffff' }}>DD</span>
        <span style={{ color: '#7B9CFF' }}>.</span>
      </div>
    ),
    { ...size }
  );
}
