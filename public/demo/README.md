# Demo HTMLs для съёмки ролика

Сюда кладём заранее сгенерированные HTML-лендинги как подстраховку на случай если API упадёт в кадре.

## Как наполнить

1. После пополнения API прогнать через Студию реальные бизнесы (3-7 раз каждый — выбрать лучший вариант):
   - simbios-marketing.ru → сохранить как `simbios-after.html`
   - второй запасной бизнес → `backup1-after.html`
   - третий → `backup2-after.html`

2. Сохранять через кнопку "↓ Скачать HTML" из Студии.

## Как активировать в ролике

Открыть `http://localhost:3000/tool?demo=simbios` — инструмент мгновенно загрузит `/demo/simbios-after.html` в iframe "ПОСЛЕ" с URL `simbios-marketing.ru` в блоке "ДО".

Зритель видит тот же before/after split что и при живой генерации. Разницы в кадре нет.

## Доступные демо-URL параметры

- `?demo=simbios` → simbios-after.html
- `?demo=backup1` → backup1-after.html
- `?demo=backup2` → backup2-after.html
