import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <script async src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=25ff2aee-f172-4ef8-9ba4-6e829954c5b5"></script>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}