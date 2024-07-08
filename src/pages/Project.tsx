import Header from '../components/Header'


function Project() {
  return (
    <>
    <Header/>
    <main className='space-y-12'>
        <section className='flex flex-col items-center w-full gap-4 pb-20 mt-10'>
            <h1 className='text-3xl font-bold tracking-tight text-dark-color mb-8'>Nome Projeto</h1>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/uP114CrRTAQ?si=MiwWgSX8hV1oL3nS" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </section>
        <div className='w-full py-8 relative flex flex-col items-center'>
            <section className='w-[74%] mb-10'>
                <h2 className='text-2xl font-bold text-dark-color mb-1'>Sobre</h2>
                <p className='mt-1 text-gray-600'>Lorem ipsum dolor sit amet</p>
            </section>
            <section className='w-[74%]'>
                <div></div>
            </section>
            <section className='w-[74%]'>
            </section>
            <section className='space-y-12 w-[74%]'>
                <div>
                    <h2 className='text-2xl font-bold text-dark-color mb-1'>Cliente</h2>
                    <p className='mt-1 text-gray-600'>Lorem ispum</p>
                </div>
                <div>
                    <h2 className='text-2xl font-bold text-dark-color mb-1'>Semestre</h2>
                    <p className='mt-1 text-gray-600'>Lorem ispum</p>
                </div>
                <div>
                    <h2 className='text-2xl font-bold text-dark-color mb-1'>Repositório</h2>
                    <p className='mt-1 text-gray-600'>Lorem ispum</p>
                </div>
            </section>
        </div>
    </main>
    </>
  )
}

export default Project