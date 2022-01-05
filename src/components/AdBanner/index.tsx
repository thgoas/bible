// import { useEffect } from 'react'

const AdBanner: React.FC = () => {
  // useEffect(() => {
  //   try {
  //     let adsbygoogle: any
  //     (adsbygoogle = (window as any).adsbygoogle || []).push({})
  //     // ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }, [])

  return (
    <ins
      className="adsbygoogle adbanner-customize"
      style={{
        display: 'block'
      }}
      data-ad-client="5272019071"
      data-ad-slot="pub-7850050259454115"
    />
  )
}

export default AdBanner
