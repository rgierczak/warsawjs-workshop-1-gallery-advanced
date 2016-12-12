# warsawjs-workshop-gallery-advanced

![](http://warsawjs.com/assets/images/logo/logo-transparent-240x240.png)

## Stack technologiczny

W projekcie użyto technologii: `ECMAScript 6 + Webpack + Babel`.

## Uruchomienie projektu

* Instalacja zależności

```
npm install
```

* Aby uruchomić projekt należy zbudować plik `main.bundle.js`

```
npm run build
```

## Opcje dodatkowe

* Usunięcie katalogu `dist` razem z zawartością

```
npm run clear
```

** Nasłuchiwanie na zmiany w kodzie oraz automatyczne budowanie pliku `main.bundle.dist`

```
npm run watch
```

## TODO

* Ładowanie zdjęć za pomocą Promise,
* Dodanie modułów (ES6 modules),
* Każde zdjęcie będzie obiektem klasy,
* Refactor kodu (wydzielenie listener callback-ów do funkcji poza klasę),
* Dodać Webpack, budowanie dist
* Stworzyć w klasie Gallery funkcje setup(),
* Budować obrazki w JS, zamiast na sztywno w HTML,
* Zastosować szablony
