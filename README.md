# Százalékgyakorló

Online gyakorlóoldal a százalékszámításhoz: véletlenszerűen generált, életszerű szöveges feladatok, három nehézségi szinttel.

- **Százalékérték** (É) kiszámítása – pl. mennyi a kedvezmény, hány tanuló jár kerékpárral
- **Százalékalap** (A) kiszámítása – pl. mennyi volt az eredeti ár, hány lakosa van a falunak
- **Százalékláb** (p) kiszámítása – pl. hány százalékos lett a dolgozat, hány százalékos volt az áremelés
- **Véletlen feladat** – a program választja ki, melyik mennyiséget kell kiszámolni

**Nehézségi szintek:**

- *Könnyű:* „kerek” százalékok (5%, 10%, 25%, 50% …), egész eredmények
- *Közepes:* tetszőleges egész százalékok, tizedes eredmények is
- *Nehéz:* tizedes százalékok (pl. 12,5%) és változásos feladatok (árengedmény, áremelés, béremelés, népességnövekedés, értékcsökkenés), ahol az új érték az eredeti 100% ± p%-a

**Lépésenkénti mód:**

1. *Mit keresünk?* – csak a Véletlen feladat témánál: a diák kiválasztja, hogy az alapot, az értéket vagy a lábat kell kiszámolni.
2. *Ismert adatok* – a diák kiírja a szövegből a két ismert adatot (változásos feladatnál a 100% ± p%-ot, illetve a különbséget).
3. *1% kiszámítása* – A : 100, illetve alap keresésekor É : p.
4. *Eredmény* – p% = 1% · p, 100% = 1% · 100, illetve p = É : 1%.

A program a tipikus hibákat külön jelzi (felcserélt alap és érték, a változás százaléka a 100% ± p% helyett, fordított osztás stb.). Van segítség és megoldás megmutatása.

**Csak eredmény mód:** csak a végeredményt kell beírni; utána megjelenik a teljes levezetés.

Minden számolás pontos tizedes aritmetikával történik (kerekítés nélkül). Az oldal egyetlen önálló fájl (`index.html`), build nélkül működik; az eredmények a böngésző `localStorage`-ában maradnak meg.

## Ellenőrzés

    node tests/verify.js
