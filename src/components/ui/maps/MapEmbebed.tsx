import clsx from 'clsx'


interface Props {
  srcMap: string
  activeMap: string
  nameMap: string
}

export const MapEmbebed = ({ srcMap, activeMap, nameMap }: Props) => {
  return (
    <div className={clsx("transition-all ease-in-out delay-150 relative",
      activeMap !== nameMap && "w-0 hidden",
      activeMap === "" && "w-full block",
      activeMap === nameMap && "w-full"
    )}>
      <iframe
        src={srcMap}
        width="600"
        height="400"
        style={{
          width: '100%',
          // height: '100%',
          border: "solid 1px #fff",
          filter: 'grayscale(100%) invert(1) hue-rotate(180deg) saturate(2)'
        }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      {/* Capa azul semi-transparente superpuesta */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 255, 0.1)',
        pointerEvents: 'none' // permite interacción con el iframe debajo
      }}></div>
    </div>
  )
}
