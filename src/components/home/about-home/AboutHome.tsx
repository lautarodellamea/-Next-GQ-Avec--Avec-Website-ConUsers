

export const AboutHome = () => {
  return (
    <div className='bg-avecBlueColor text-white w-full py-16 relative h-fit'>
      <video
        // src="/videos/about-home-video.webm"
        autoPlay
        // TODO: probar si el loop genera inconvenientes en IOS
        loop
        muted
        playsInline
        className="absolute  top-0 left-0  w-full h-full object-cover z-0">
        <source src="/videos/about-home-video.mp4" type="video/mp4" />
        <source src="/videos/about-home-video.webm" type="video/webm" />
      </video>
      <div className='relative container mx-auto p-4 z-10 flex flex-col mq-810px:flex-row gap-10 mq-810px:gap-20 justify-between items-center'>

        <div className="basis-1/2 text-left mq-810px:text-left">
          <h4 className="text-2xl mq-364px:text-3xl mb-4 uppercase font-bold">Logros en nuestro camino</h4>
          <p className='mb-4'>
            Nos mueve la pasión de transformar la experiencia automotriz.
          </p>
          <p>
            Hace más de 15 años que conectamos con la historia de cada cliente. En Avec, concesionario del <strong>Grupo Quijada</strong>, tenemos la certeza de que cada viaje es único y especial. Nos enorgullece formar parte de una red que prioriza la satisfacción y la confianza, haciendo de cada experiencia un momento inolvidable.
          </p>
          {/* <Link href="/nosotros"><Button variant="outline" className="bg-tranparent text-white mt-4" >Conócenos</Button></Link> */}
        </div>



      </div>
    </div>
  )
}
