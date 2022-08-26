import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Products from '../components/Products';

export default function Home(props) {
  const { currentDate, currentTemp, productData } = props;
  return (
    <div className={styles.container}>
      <Head>
        <title>Sonnencremefinder</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image src="/DmBrandClaimIcon.svg" height={200} width={200} />
        <div className={styles.overview}>
          <h1 className={styles.title}>
            Willkommen zum <a href="https://www.dm.de/search?query=Sonnencreme&searchType=product">dm</a> Sonnencremefinder! ☀️
          </h1>
          <h1>Heute ist der {currentDate}</h1>
          <h3>Aktuell sind es {Math.round(currentTemp)} °C</h3>
        </div>
        <Products productData={productData} />
        <br />
        <p>Die Auswahl des Lichtschutzfaktors wurde anhand des maximalen UV-Index der nächsten 5 Tage getätigt</p>
      </main>

      <footer className={styles.footer}>
        <p>Made with ❤️ and Next.js</p>
        <p>This is a noncommercial website</p>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  const city = "Karlsruhe,ger"

  const getCoords = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3a29299823c33975b374a819ae0b7a08`);
  const coordData = await getCoords.json();

  const lat = coordData.coord.lat;
  const lon = coordData.coord.lon;

  const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=3a29299823c33975b374a819ae0b7a08&units=metric`);
  const weatherData = await res.json();

  const unixDateConverter = (unixDate) => {
    const realDate = new Date(unixDate * 1000).toLocaleDateString("de-DE");
    return realDate;
  }

  const highestUviValue = (weatherData) => {
    const uvis = [weatherData.current.uvi];
    weatherData.daily.forEach(element => {
      uvis.push(element.uvi)
    });

    uvis.splice(6, 3) //The last three values seem to be dummy data

    return (Math.max(...uvis))
  }

  const SpfCalculator = (highestUvi) => {
    if (highestUvi <= 3) {
      return ("Niedriger%20Schutz%20(6-10)")
    } else if (highestUvi > 3 && highestUvi <= 5) {
      return ("Mittlerer%20Schutz%20(15-25)")
    } else if (highestUvi >= 5 && highestUvi <= 7) {
      return ("Hoher%20Schutz%20(30-50)")
    } else {
      return ("Sehr%20hoher%20Schutz%20(50%2B)")
    }
  }

  const productRes = await fetch(`https://product-search.services.dmtech.com/de/search/crawl?query=sonnencreme&searchType=product&sunProtectionFactorRange=${SpfCalculator(highestUviValue(weatherData))}&type=search&brandName=SUNDANCE&brandName=babylove&pageSize=5`)
  const productData = await productRes.json()

  const currentDate = unixDateConverter(weatherData.current.dt)
  const currentTemp = weatherData.current.temp

  return { props: { productData, currentDate, currentTemp } }
}