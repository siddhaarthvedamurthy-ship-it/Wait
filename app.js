/* ============================================================
   PANTHEON OF THE SKIES — app.js
   Production-grade Archaeo-Astronomy Simulator
   ============================================================ */

'use strict';

/* ============================================================
   CIVILIZATION DATA REGISTRY
   ============================================================ */
const CIVS = {

  vedic: {
    name: 'Vedic India',
    themeClass: 'theme-vedic',
    accent: '#E8A838',
    bgImage: 'Brahman.png',
    deities: [
      {
        id: 'brahman',
        name: 'Brahman',
        role: 'The Absolute — Formless Ultimate Reality',
        domains: ['Cosmos','Eternal','Upanishadic'],
        img: 'Brahman.png',
        myth: 'Brahman is the singular, infinite, changeless ground of all existence described in the Upanishads. Neither creator nor created, Brahman is Satyam (Truth), Jnanam (Consciousness), Anantam (Infinity). The Taittiriya Upanishad declares: "Satyam Jnanam Anantam Brahma." All gods, all matter, all souls are expressions of this one undivided reality. The Chandogya Upanishad affirms "Aham Brahmasmi" — I am Brahman — as the supreme mahavakya.',
        stats: { nature: 'Nirguna (Formless)', texts: 'Upanishads, Vedas', era: '1500–500 BCE', counterpart: 'Atman (Self)' }
      },
      {
        id: 'brahma',
        name: 'Brahma',
        role: 'Prajapati — Lord of Progeny, Creator',
        domains: ['Creation','Time','Knowledge'],
        img: 'Brahma.png',
        myth: 'Brahma, the four-faced Creator, is the Swayambhu, meaning he created himself. Sectatarian Puranic texts make him appear as an old, frail, man and mock him constantly. This was done to promote their own gods above Brahma. There are claims about him being seperate from Brahman-Brahma is the caricature of Brahman that the sectatarian texts use to mock the Upanishadic creator that is more than a 1000 years older than them.',
        stats: { vehicle: 'Hamsa (Swan)', consort: 'Sarasvati', weapon: 'Brahmastra', lifespan: '311.04 Trillion years' }
      },
      {
        id: 'indra',
        name: 'Indra',
        role: 'Shakra — King of the Devas, God of Thunder',
        domains: ['Storm','Lightning','War','Heaven'],
        img: 'Indra_2.png',
        myth: 'Indra is the mightiest Rigvedic deity — nearly 250 hymns extol him. He wields the Vajra (thunderbolt) forged from sage Dadhichi\'s bones to slay the cosmic serpent Vritra and release the celestial waters. He rides the white elephant Airavata and governs Svarga (heaven). Master of the monsoon, he is both feared and beloved. His Soma drinking is legendary, fuelling his cosmic battles.',
        stats: { vehicle: 'Airavata (white elephant)', weapon: 'Vajra (thunderbolt)', realm: 'Svarga (3rd Heaven)', vedic_hymns: '~250 hymns in Rigveda' }
      },
      {
        id: 'agni',
        name: 'Agni',
        role: 'The Sacred Fire — Messenger of Gods and Men',
        domains: ['Fire','Sacrifice','Purification','Home'],
        img: 'Agni.png',
        myth: 'Agni is the eternal intermediary between mortal and divine. Born two-headed — he is present in every sacred hearth, every yagna (ritual fire). The Rigveda opens with "Agnim ile purohitam" — I praise Agni the priest. He carries sacrificial offerings to the gods on fragrant smoke, is the witness of marriages, and purifies the dead. He rides a ram and wears a crown of flames.',
        stats: { vehicle: 'Ram (Mesha)', faces: 'Two Heads', realm: 'All three worlds', rigveda_hymns: '~200+ hymns' }
      },
      {
        id: 'daksha',
        name: 'Daksha',
        role: 'Prajapati Daksha — Progenitor of Creation',
        domains: ['Progeny','Order','Sacrifice'],
        img: 'Daksha.png',
        myth: 'Daksha is the great Prajapati (Lord of Progeny), son of Brahma, progenitor of many sons with Aditi in the Rig Veda. He had sixty daughters whose descendants populate all the realms in the Puranas, but was much more powerful in the Vedas. His name is used interchangeably with Dyaus and Purusha as the father of Surya, Indra and the one in a paradoxical loop. ',
        stats: { sons: 'Surya, Indra, Agni, Varuna, Vayu, Chandra', father: 'Brahma', fate: 'Beheaded by Virabhadra', restoration: 'Given a goat\'s head by Shiva' }
      },
      {
        id: 'varuna',
        name: 'Varuna',
        role: 'Lord of Cosmic Order — Guardian of Rta',
        domains: ['Ocean','Cosmic Law','Night Sky','Oath'],
        img: 'Varuna.png',
        myth: 'Varuna is the all-seeing sovereign of Rta — the cosmic moral order that holds the universe together. He rides the makara (sea-dragon) across primordial waters, binds sinners with his noose (Pasha), and releases the repentant. His thousand eyes are the stars. In Vedic cosmology he governs the night sky and the western quarter. He is the guardian of oaths and the punisher of falsehood. Later he became the lord of all waters.',
        stats: { vehicle: 'Makara (sea-dragon)', weapon: 'Pasha (cosmic noose)', domain: 'Rta, cosmic waters', eyes: '1000 (the stars)' }
      },
      {
        id: 'vayu',
        name: 'Vayu',
        role: 'God of Wind — Breath of the Cosmos',
        domains: ['Wind','Breath','Speed','Vital Force'],
        img: 'Vayu.png',
        myth: 'Vayu is the life-breath of the cosmos — the first to drink Soma at dawn before the gods. He is the father of Hanuman and the Pandava hero Bhima. His vehicle is the mriga (antelope), symbol of fleet-footed wind. As Prana (vital breath), he sustains all life within every living being. The Atharvaveda hails Vayu as the breath of the cosmic Purusha. He governs the northwest direction and commands the maruts (storm troops).',
        stats: { vehicle: 'Mriga (antelope/deer)', sons: 'Hanuman, Bhima', direction: 'Northwest (Vayavya)', form: 'Prana in all beings' }
      },
      {
        id: 'soma',
        name: 'Soma',
        role: 'Moon God — Lord of the Sacred Drink',
        domains: ['Moon','Ritual Drink','Plants','Mind'],
        img: 'Soma.png',
        myth: 'Soma is simultaneously the moon deity and the sacred ritual drink pressed from a mountain plant. The ninth mandala of the Rigveda (Soma Mandala) contains 114 hymns entirely dedicated to Soma Pavamana. He is the king of plants and the Brahmins\' patron. The moon waxes as the gods drink Soma, wanes as mortals partake. He rules the mind (manas), dew, and healing. His silver radiance inspired the Vedic concept of immortal nectar — amrita.',
        stats: { vehicle: 'Silver chariot (drawn by white horses)', realm: 'Chandraloka (Moon realm)', drink: 'Psychoactive ritual soma', texts: 'Entire Rigveda Mandala IX' }
      },
      {
        id: 'yama',
        name: 'Yama & Yami',
        role: 'Lord of Death and the Twin of Time',
        domains: ['Death','Dharma','Justice','Time'],
        img: 'Yama-Yami_2.png',
        myth: 'Yama was the first mortal to die and thus became king of the dead and judge of souls. His twin sister Yami (the river Yamuna) embodies the complementary feminine principle. Yama rides a black buffalo, wields his staff (danda) and noose, and is attended by two four-eyed dogs who guard the path to his realm. The Katha Upanishad is entirely a dialogue between the youth Nachiketa and Yama, in which Yama reveals the secrets of death and the immortal Atman. Yama was incredibly handsome in the Vedas, but was made to look ugly in the Puranas.',
        stats: { vehicle: 'Black buffalo (Mahisha)', weapon: 'Danda (staff) + Pasha', realm: 'Yamaloka / Naraka', twin: 'Yami (river Yamuna)' }
      },
      {
        id: 'prana',
        name: 'Prana',
        role: 'The Life-Breath — Cosmic Vital Force',
        domains: ['Breath','Life','Five Vayus','Consciousness'],
        img: 'Prana.png',
        myth: 'Prana is the universal life-force that animates all existence. He is used interchangably with Purusha, Dyaus and even Daksha in a few older texts, with the three and many more gods being his forms. He is sometimes considered to be the son of Brahman and Vac, sometimes the supreme king, so on. The Chandogya Upanishad declares "Prana evaidam sarvam" — Prana alone is all this. It manifests in five forms in the body: Prana (inhalation), Apana (exhalation/downward), Samana (digestion), Vyana (circulation), and Udana (upward/transcendence). The Brihadaranyaka Upanishad calls Prana "the oldest and the best." Control of Prana through pranayama leads to mastery of mind and liberation.',
        stats: { five_forms: 'Prana, Apana, Samana, Vyana, Udana', texts: 'Prashna, Chandogya, Brihadaranyaka Upanishads', cosmic_role: 'Sustainer of all life', yogic_path: 'Pranayama → liberation' }
      }
    ],
    stars: stars: [
  { name: 'Ashwini', modern: 'Alpha Arietis (Hamal)', ra0: 31.792, dec0: 23.462, mag: 2.01, color: '#FFC080', myth: 'Represents cosmic life-force, swift healing, and the dawn of creation. The twins travel in a golden chariot bringing rejuvenation to the cosmos.', mass: '1.5 M☉', distance: '65.8 ly', radius: '14.9 R☉' },
  { name: 'Bharani', modern: '41 Arietis', ra0: 42.496, dec0: 27.261, mag: 3.61, color: '#FFA060', myth: 'The cosmic portal of birth, death, and transformation. It controls the transition of souls and the strict laws of karma.', mass: '2.6 M☉', distance: '166 ly', radius: '2.1 R☉' },
  { name: 'Krittika', modern: 'Eta Tauri (Alcyone / Pleiades)', ra0: 56.871, dec0: 24.105, mag: 2.85, color: '#A0C8FF', myth: 'The intense fire that purifies raw elements. Mythologically known as the foster mothers of the war god Kartikeya, representing protective fury.', mass: '6.0 M☉', distance: '440 ly', radius: '10.0 R☉' },
  { name: 'Rohini', modern: 'Alpha Tauri (Aldebaran)', ra0: 68.979, dec0: 16.509, mag: 0.85, color: '#FF8040', myth: 'The \'Red One\', celebrated as the most beautiful cosmic mansion. It signifies fertility, agricultural abundance, and pure creative growth.', mass: '1.16 M☉', distance: '65.3 ly', radius: '44.1 R☉' },
  { name: 'Mrigashirsha', modern: 'Lambda Orionis (Meissa)', ra0: 83.783, dec0: 9.934, mag: 3.39, color: '#B0D0FF', myth: 'Symbolizes the eternal search, curiosity, and wandering across realms. Represents the soothing, refreshing qualities of the divine lunar nectar.', mass: '27.9 M☉', distance: '1100 ly', radius: '10.0 R☉' },
  { name: 'Ardra', modern: 'Alpha Orionis (Betelgeuse)', ra0: 88.792, dec0: 7.407, mag: 0.50, color: '#FF6040', myth: 'The cosmic storm clearing away old decay. Out of devastation and sorrow (the tear), new consciousness and clarity are forged.', mass: '16.5 M☉', distance: '642 ly', radius: '887 R☉' },
  { name: 'Punarvasu', modern: 'Beta Geminorum (Pollux)', ra0: 116.329, dec0: 28.026, mag: 1.14, color: '#FFD090', myth: 'The return of light, prosperity, and safety. Like arrows returning to the quiver, it brings back harmony, boundless space, and renewal.', mass: '1.91 M☉', distance: '33.7 ly', radius: '8.8 R☉' },
  { name: 'Pushya', modern: 'Delta Cancri (Asellus Australis)', ra0: 131.171, dec0: 18.154, mag: 3.94, color: '#FFC880', myth: 'Considered the most spiritually nurturing of all lunar mansions. It pours down spiritual wisdom, divine nourishment, and auspicious fortune.', mass: '2.1 M☉', distance: '131 ly', radius: '11.0 R☉' },
  { name: 'Ashlesha', modern: 'Alpha Hydrae (Alphard)', ra0: 141.896, dec0: -8.659, mag: 1.98, color: '#FFA870', myth: 'Represents hidden primal energies, intense intuition, and kundalini. Governs the mysteries of deep poison and its ultimate transformation into medicine.', mass: '3.03 M☉', distance: '177 ly', radius: '50.5 R☉' },
  { name: 'Magha', modern: 'Alpha Leonis (Regulus)', ra0: 152.092, dec0: 11.967, mag: 1.35, color: '#B0D0FF', myth: 'The seat of linear heritage and royal power. Connects the earthly plane directly with the ancient souls who preserve cosmic history.', mass: '3.8 M☉', distance: '79.3 ly', radius: '3.0 R☉' },
  { name: 'Purva Phalguni', modern: 'Delta Leonis (Zosma)', ra0: 168.558, dec0: 20.524, mag: 2.56, color: '#FFD8A0', myth: 'The space of rest, marital bliss, and creative recreation. Represents the natural enjoyment of earthly wealth and physical relaxation.', mass: '2.2 M☉', distance: '58.4 ly', radius: '2.14 R☉' },
  { name: 'Uttara Phalguni', modern: 'Beta Leonis (Denebola)', ra0: 177.263, dec0: 14.572, mag: 2.14, color: '#FFD0A0', myth: 'Governs formal contracts, long-term societal duties, kindness, and noble friendships that sustain civil societies.', mass: '1.75 M☉', distance: '35.9 ly', radius: '1.73 R☉' },
  { name: 'Hasta', modern: 'Delta Corvi (Algorab)', ra0: 187.467, dec0: -16.515, mag: 2.94, color: '#B8D8FF', myth: 'Represents solar rays extending like hands to wake up humanity. It controls precise craftsmanship, magic, healing, and absolute focus.', mass: '2.7 M☉', distance: '86.9 ly', radius: '4.9 R☉' },
  { name: 'Chitra', modern: 'Alpha Virginis (Spica)', ra0: 201.300, dec0: -11.161, mag: 0.98, color: '#B0D4FF', myth: 'The glowing canvas of illusions and beautiful design. Vishwakarma uses this sector to craft the forms, palaces, and geometric dimensions of the universe.', mass: '11.43 M☉', distance: '250 ly', radius: '7.47 R☉' },
  { name: 'Swati', modern: 'Alpha Boötis (Arcturus)', ra0: 213.913, dec0: 19.182, mag: -0.05, color: '#FFB060', myth: 'Represents the free movement of the soul, individual liberty, and life breath (Prana). It signifies adaptation and ultimate mental agility.', mass: '1.08 M☉', distance: '36.7 ly', radius: '25.4 R☉' },
  { name: 'Vishakha', modern: 'Alpha2 Librae (Zubenelgenubi)', ra0: 222.721, dec0: -16.042, mag: 2.75, color: '#FFC890', myth: 'A dual-powered center combining spiritual alignment and raw ambition. Symbolizes focused conquest and targeted victory over dark forces.', mass: '1.82 M☉', distance: '75.8 ly', radius: '2.4 R☉' },
  { name: 'Anuradha', modern: 'Delta Scorpionis (Dschubba)', ra0: 240.083, dec0: -22.622, mag: 2.29, color: '#FF9060', myth: 'The devotion that blossoms in harsh situations. It builds networks of trust, harmony, and coordination across conflicting factions.', mass: '13.0 M☉', distance: '402 ly', radius: '6.7 R☉' },
  { name: 'Jyeshtha', modern: 'Alpha Scorpionis (Antares)', ra0: 247.350, dec0: -26.432, mag: 1.05, color: '#FF6040', myth: 'The \'Eldest\' lunar mansion, indicating high mystical mastery, structural authority, and the mental power to defend against chaos.', mass: '11.2 M☉', distance: '550 ly', radius: '680 R☉' },
  { name: 'Mula', modern: 'Lambda Scorpionis (Shaula)', ra0: 263.400, dec0: -37.104, mag: 1.62, color: '#FF9060', myth: 'The galactic center. Nirriti breaks down material attachments to reveal core fundamental truths. It forces you to uproot assumptions.', mass: '10.4 M☉', distance: '700 ly', radius: '8.8 R☉' },
  { name: 'Purva Ashadha', modern: 'Delta Sagittarii (Kaus Media)', ra0: 275.246, dec0: -29.828, mag: 2.72, color: '#FFB070', myth: 'The invisible, all-pervading ocean of unmanifested potentials. It represents declaration of war against injustice and clearing away wheat from chaff.', mass: '5.0 M☉', distance: '305 ly', radius: '16.0 R☉' },
  { name: 'Uttara Ashadha', modern: 'Sigma Sagittarii (Nunki)', ra0: 283.813, dec0: -26.297, mag: 2.05, color: '#FFB880', myth: 'Represents permanent victory and global alignment with dharma. Backed by the collective power of all universal virtues.', mass: '7.8 M☉', distance: '228 ly', radius: '4.5 R☉' },
  { name: 'Shravana', modern: 'Alpha Aquilae (Altair)', ra0: 297.696, dec0: 8.868, mag: 0.76, color: '#FFE0C0', myth: 'The cosmic domain of listening to divine cosmic rhythms. It maps oral transmissions of timeless knowledge and the preservation of space.', mass: '1.79 M☉', distance: '16.7 ly', radius: '1.63 R☉' },
  { name: 'Dhanishta', modern: 'Alpha Delphini (Sualocin)', ra0: 309.908, dec0: 15.912, mag: 3.77, color: '#FFD0A0', myth: 'The cosmic symphony of time and rhythm. It bestows sudden structural wealth, musical talents, and perfect attunement to universal flow.', mass: '2.8 M☉', distance: '241 ly', radius: '3.9 R☉' },
  { name: 'Shatabhisha', modern: 'Gamma Aquarii (Sadachbia)', ra0: 335.413, dec0: -1.387, mag: 3.84, color: '#B8D8FF', myth: 'The fortress of 100 healers. It hides secrets inside vast dark cosmic waters, overseeing karmic net entrapments and miraculous health recoveries.', mass: '1.9 M☉', distance: '158 ly', radius: '3.0 R☉' },
  { name: 'Purva Bhadrapada', modern: 'Alpha Pegasi (Markab)', ra0: 346.192, dec0: 15.205, mag: 2.49, color: '#FFD0A0', myth: 'The fierce transformational lightning fire. It breaks illusions violently, channeling high spiritual sacrifice and ascetic transformation.', mass: '3.5 M☉', distance: '140 ly', radius: '4.7 R☉' },
  { name: 'Uttara Bhadrapada', modern: 'Gamma Pegasi (Algenib)', ra0: 3.308, dec0: 15.184, mag: 2.83, color: '#B8D0FF', myth: 'The silent power operating from dark galactic trenches. It stabilizes shifting realities, controlling peace, stillness, and deep dream worlds.', mass: '8.9 M☉', distance: '333 ly', radius: '4.8 R☉' },
  { name: 'Revati', modern: 'Zeta Piscium', ra0: 18.433, dec0: 7.575, mag: 5.24, color: '#FFE0C0', myth: 'The final frontier of the zodiac wheel. Pushan safely guides departing souls across boundaries, ensuring a safe passage and path illumination.', mass: '1.33 M☉', distance: '188 ly', radius: '1.7 R☉' }
],
    calendar: {
      title: 'Vedic Lunisolar Calendar (Panchanga)',
      system: 'The Vedic calendar fuses solar and lunar reckoning through the concept of the Panchanga — five limbs of time. It is based on the 27-Nakshatra system (each nakshatra = 13°20\' arc), the Tithi (lunar day = 1/30th of a synodic month), and the Ritu (season).',
      math: [
        'Synodic Month = 29.530589 solar days',
        'Sidereal Year = 365.25636 solar days',
        '27 Nakshatras × 13°20\' = 360° (full zodiac)',
        'Tithi = Synodic Month / 30 ≈ 0.9843 days',
        'Intercalary month (Adhika Masa) every ~32.5 months',
        'Yuga cycle: 4,320,000 years (Mahayuga)',
        'Kalpa (Brahma\'s day) = 4,320,000,000 years'
      ],
      cycles: [
        { name: 'Tithi (Lunar Day)', val: '~0.984 solar days' },
        { name: 'Nakshatra Day', val: '~0.915 solar days' },
        { name: 'Synodic Month', val: '29.5306 days' },
        { name: 'Sidereal Month', val: '27.3217 days' },
        { name: 'Solar Year (Savana)', val: '360 days (ritual)' },
        { name: 'Tropical Year', val: '365.2422 days' },
        { name: 'Kali Yuga', val: '432,000 years' },
        { name: 'Dvapara Yuga', val: '864,000 years' },
        { name: 'Treta Yuga', val: '1,296,000 years' },
        { name: 'Krita/Satya Yuga', val: '1,728,000 years' },
        { name: 'Mahayuga (4 Yugas)', val: '4,320,000 years' },
        { name: 'Kalpa (Brahma\'s Day)', val: '4,320,000,000 years' }
      ],
      lore: 'The Rigveda\'s Nasadiya Sukta (10.129) begins with the primordial void: "Neither existence nor non-existence was there." The Vedic rishis observed the heliacal risings of nakshatras to fix the timing of yajnas. The Vedanga Jyotisha (c. 1200 BCE) is the first astronomical treatise, tracking the sun and moon through nakshatras. The 19-year Metonic cycle was known as the Sapta-panchashika (5-year yuga) multiplied by ~4.'
    }
  },

  egypt: {
    name: 'Ancient Egypt',
    themeClass: 'theme-egypt',
    accent: '#1D4FA3',
    bgImage: 'ChatGPT_Image_May_22__2026__12_39_24_AM.png',
    deities: [
      {
        id: 'ra',
        name: 'Ra / Ra-Horakhty',
        role: 'The Sun God — King of All Gods',
        domains: ['Sun','Creation','Kingship','Day'],
        img: 'ChatGPT_Image_May_22__2026__12_28_20_AM.png',
        myth: 'Ra, the supreme solar deity, sails across the sky in his celestial barque by day and battles the serpent Apophis in the underworld each night. At dawn he emerges as Khepri (scarab), at noon he is Ra in full power, at sunset Atum. Every pharaoh was his son. Ra absorbed other deities — becoming Amun-Ra, Ra-Horakhty (Horus of the Horizon). The Pyramid Texts record his nightly journey through the twelve hours of the Duat.',
        stats: { forms: 'Ra, Khepri (dawn), Atum (dusk)', crown: 'Solar disk + cobra uraeus', barque: 'Mandjet (day), Mesektet (night)', texts: 'Pyramid Texts, Book of the Dead' }
      },
      {
        id: 'osiris',
        name: 'Osiris',
        role: 'Lord of the Afterlife — God of Resurrection',
        domains: ['Death','Resurrection','Nile Flood','Agriculture'],
        img: 'ChatGPT_Image_May_22__2026__12_31_13_AM.png',
        myth: 'Osiris was the first divine king of Egypt, murdered by his brother Set who dismembered his body and scattered the 14 pieces across Egypt. Isis, his devoted sister-wife, reassembled him and breathed life back into him long enough to conceive Horus. Osiris rules the Duat (underworld) where he weighs hearts on the scales of Ma\'at against the feather of truth. His green skin symbolises resurrection, vegetation, and the Nile\'s fertile silt.',
        stats: { skin: 'Green (resurrection/vegetation)', symbols: 'Crook + Flail, white mummy wrappings', consort: 'Isis', son: 'Horus' }
      },
      {
        id: 'horus',
        name: 'Horus',
        role: 'Sky God — Divine Falcon, Patron of Pharaohs',
        domains: ['Sky','Kingship','War','Protection'],
        img: 'ChatGPT_Image_May_22__2026__12_24_12_AM.png',
        myth: 'Horus, the falcon-headed sky god, avenged his father Osiris in the great battle against Set. His right eye is the sun, his left eye the moon — lost and restored by Thoth, it became the Wedjat (Eye of Horus), the most powerful protective amulet in Egypt. Every living pharaoh was Horus incarnate. The Contendings of Horus and Set describes their epic 80-year struggle before the tribunal of the Ennead declared Horus the rightful king.',
        stats: { head: 'Peregrine Falcon', eyes: 'Right = Sun, Left = Moon', mother: 'Isis', father: 'Osiris' }
      },
      {
        id: 'thoth',
        name: 'Thoth',
        role: 'God of Wisdom — Scribe of the Gods',
        domains: ['Writing','Moon','Magic','Science','Law'],
        img: 'ChatGPT_Image_May_22__2026__12_31_29_AM.png',
        myth: 'Thoth, the ibis-headed or baboon-faced god of writing and wisdom, invented hieroglyphs, recorded the verdict of the dead\'s heart-weighing, and reconciled the lunar calendar\'s deficit to match the solar year by gambling with the Moon for 5 extra days (the Epagomenal Days). He is the author of the 42 Books of Thoth, attributed with all knowledge. Hermes Trismegistus of the later Hermetic tradition is his Greek equivalent.',
        stats: { head: 'Sacred Ibis or Baboon', consort: 'Ma\'at or Seshat', invention: 'Hieroglyphics, calendars, magic', greek_equiv: 'Hermes Trismegistus' }
      },
      {
        id: 'isis',
        name: 'Isis',
        role: 'Goddess of Magic and Motherhood',
        domains: ['Magic','Healing','Motherhood','Wind'],
        img: '',
        myth: 'Isis is the greatest magician of the Egyptian pantheon. She resurrected Osiris using her vast knowledge of magic, conceived Horus immaculately after his death, and protected the infant god from Set. She tricked Ra into revealing his secret name, gaining power over him. Her wings fan the winds of Egypt. Her cult spread throughout the Roman Empire — she was worshipped from Britain to Mesopotamia as Regina Caeli, Queen of Heaven.',
        stats: { symbol: 'Throne hieroglyph on head', wings: 'Wingspan spans the sky', magic: 'Greatest magician in Egypt', cult: 'Spread throughout Rome' }
      },
      {
        id: 'anubis',
        name: 'Anubis',
        role: 'Jackal God — Guardian of the Scales',
        domains: ['Embalming','Death','Judgment','Protection'],
        img: '',
        myth: 'Anubis, the jackal-headed god, presides over mummification and the Hall of Two Truths where he weighs the heart of the deceased against Ma\'at\'s feather. He guides souls through the Duat and protects the sacred embalming rites. Once the principal funerary deity before Osiris rose to prominence, Anubis was demoted to guardian of the scales. His black color represents both the dark soil of the Nile\'s fertile banks and the blackened skin of mummified bodies.',
        stats: { head: 'Jackal', color: 'Black (fertility + mummification)', role: 'Embalmer of Osiris', weighing: 'Heart vs Feather of Ma\'at' }
      }
    ],
    stars: [
  // PATH OF ENLIL (12 stars)
  { name: 'Kakkab APIN (The Plough)', modern: 'Alpha Andromedae (Alpheratz)', ra0: 2.096, dec0: 29.091, mag: 2.06, color: '#FFC890', myth: 'Used to time the absolute beginning of field plowing and spring agricultural preparation.', mass: '3.8 M☉', distance: '97 ly', radius: '2.7 R☉' },
  { name: 'Kakkab SHU.GI (The Old Man)', modern: 'Zeta Persei', ra0: 58.529, dec0: 31.884, mag: 2.85, color: '#FFA870', myth: 'Represented ancestral lineage, final harvest conclusions, and transition into the dry months.', mass: '19.0 M☉', distance: '750 ly', radius: '21.0 R☉' },
  { name: 'Kakkab GAM (The Crook)', modern: 'Alpha Aurigae (Capella)', ra0: 79.171, dec0: 45.998, mag: 0.08, color: '#FFE0A0', myth: 'Represented the sacred crook or weapon used by the creator god to control the flock of stars.', mass: '2.56 M☉', distance: '42.8 ly', radius: '11.98 R☉' },
  { name: 'Kakkab MAŠ.TAB.BA.GAL.GAL (Great Twins)', modern: 'Beta Geminorum (Pollux)', ra0: 116.329, dec0: 28.026, mag: 1.14, color: '#FFD090', myth: 'The underworld guardian twins who stood watch at the northern gate of heaven to stop chaos.', mass: '1.91 M☉', distance: '33.7 ly', radius: '8.8 R☉' },
  { name: 'Kakkab AL.LUL (The Crab)', modern: 'Acubens (Alpha Cancri)', ra0: 134.621, dec0: 11.858, mag: 4.26, color: '#FFC880', myth: 'Recognised as the celestial seat of the high sky god Anu during midsummer elevations.', mass: '2.1 M☉', distance: '174 ly', radius: '4.5 R☉' },
  { name: 'Kakkab UR.GU.LA (The Lion\'s Head)', modern: 'Epsilon Leonis', ra0: 146.463, dec0: 23.774, mag: 2.98, color: '#FFB880', myth: 'Signalled the peak dry summer heat and opened the warfare and royal hunting windows.', mass: '4.0 M☉', distance: '247 ly', radius: '21.0 R☉' },
  { name: 'Kakkab SHU.PA (The Staff)', modern: 'Alpha Boötis (Arcturus)', ra0: 213.913, dec0: 19.182, mag: -0.05, color: '#FFB060', myth: 'Viewed as the vertical axis or support pillar holding up the crown of the northern hemisphere.', mass: '1.08 M☉', distance: '36.7 ly', radius: '25.4 R☉' },
  { name: 'Kakkab BAL-UR-A (The Jewel)', modern: 'Alpha Coronae Borealis', ra0: 233.671, dec0: 26.715, mag: 2.22, color: '#FFD8A0', myth: 'Symbolised the divine jewelled head-dress dropped into the sky by the primordial mother goddess.', mass: '2.58 M☉', distance: '75 ly', radius: '3.0 R☉' },
  { name: 'Kakkab MAR.GID.DA (The Wagon)', modern: 'Alpha Ursae Majoris (Dubhe)', ra0: 165.933, dec0: 61.751, mag: 1.79, color: '#FFE0C0', myth: 'The northern wagon whose unblinking circumpolar rotation tracked the nightly hours.', mass: '4.25 M☉', distance: '123 ly', radius: '30.0 R☉' },
  { name: 'Kakkab TIE (The Raven)', modern: 'Zeta Ursae Majoris (Mizar)', ra0: 200.979, dec0: 54.925, mag: 2.23, color: '#FFD0A0', myth: 'Governed by the god of plagues and deep conflict, marking ominous winter sky transitions.', mass: '2.2 M☉', distance: '82.9 ly', radius: '2.4 R☉' },
  { name: 'Kakkab UZ (The She-Goat)', modern: 'Alpha Lyrae (Vega)', ra0: 279.233, dec0: 38.784, mag: 0.03, color: '#C0D8FF', myth: 'Associated with the ultimate goddess of healing, dispensing medicines from the sky vault.', mass: '2.13 M☉', distance: '25 ly', radius: '2.36 R☉' },
  { name: 'Kakkab KU (The Great Fish)', modern: 'Beta Andromedae (Mirach)', ra0: 17.433, dec0: 35.621, mag: 2.07, color: '#FFC890', myth: 'Guarded the northern horizon interface, helping to manage late-winter astronomical cycles.', mass: '2.49 M☉', distance: '197 ly', radius: '86.0 R☉' },

  // PATH OF ANU (12 stars)
  { name: 'Kakkab LU.HUN.GA (The Hired Man)', modern: 'Alpha Arietis (Hamal)', ra0: 31.792, dec0: 23.462, mag: 2.01, color: '#FFC080', myth: 'Represented the resurrected shepherd god, pinning the location of the early spring equinox.', mass: '1.5 M☉', distance: '65.8 ly', radius: '14.9 R☉' },
  { name: 'Kakkab MUL.MUL (The Bristle)', modern: 'Eta Tauri (Alcyone)', ra0: 56.871, dec0: 24.105, mag: 2.85, color: '#A0C8FF', myth: 'The foundational anchor group of the zodiac, tracking high-importance royal omens.', mass: '6.0 M☉', distance: '440 ly', radius: '10.0 R☉' },
  { name: 'Kakkab GUD.AN.NA (Bull of Heaven)', modern: 'Alpha Tauri (Aldebaran)', ra0: 68.979, dec0: 16.509, mag: 0.85, color: '#FF8040', myth: 'Represented the fierce bull sent to fight Gilgamesh, marking late spring sky transitions.', mass: '1.16 M☉', distance: '65.3 ly', radius: '44.1 R☉' },
  { name: 'Kakkab SIPA.ZI.AN.NA (True Shepherd)', modern: 'Alpha Orionis (Betelgeuse)', ra0: 88.792, dec0: 7.407, mag: 0.50, color: '#FF6040', myth: 'The cosmic messenger god who delivered decrees back and forth between heaven and earth.', mass: '16.5 M☉', distance: '642 ly', radius: '887 R☉' },
  { name: 'Kakkab KAK.SI.SA (The Arrow)', modern: 'Alpha Canis Majoris (Sirius)', ra0: 101.288, dec0: -16.716, mag: -1.46, color: '#A0C8FF', myth: 'Pierced the heavy summer horizon to call down the seasonal rains and unlock the waterways.', mass: '2.06 M☉', distance: '8.6 ly', radius: '1.71 R☉' },
  { name: 'Kakkab BAN (The Bow)', modern: 'Delta Canis Majoris (Wezen)', ra0: 107.096, dec0: -26.393, mag: 1.83, color: '#FFA860', myth: 'The divine weapon loaded with the cosmic arrow, aimed directly at sky monsters.', mass: '16.9 M☉', distance: '1600 ly', radius: '215 R☉' },
  { name: 'Kakkab LUGAL (The King)', modern: 'Alpha Leonis (Regulus)', ra0: 152.092, dec0: 11.967, mag: 1.35, color: '#B0D0FF', myth: 'The core royal indicator star. It dictated court timelines and structural royal prophecies.', mass: '3.8 M☉', distance: '79.3 ly', radius: '3.0 R☉' },
  { name: 'Kakkab AB.SIN (The Furrow)', modern: 'Alpha Virginis (Spica)', ra0: 201.300, dec0: -11.161, mag: 0.98, color: '#B0D4FF', myth: 'Symbolised grain fertility and agricultural wealth sown along the Mesopotamian canal beds.', mass: '11.43 M☉', distance: '250 ly', radius: '7.47 R☉' },
  { name: 'Kakkab ZI.BA.AN.NA (The Scales)', modern: 'Alpha Librae (Zubenelgenubi)', ra0: 222.721, dec0: -16.042, mag: 2.75, color: '#FFC890', myth: 'The point of solar justice and equal measurement across day and night durations.', mass: '1.82 M☉', distance: '75.8 ly', radius: '2.4 R☉' },
  { name: 'Kakkab GIR.TAB (The Scorpion)', modern: 'Alpha Scorpionis (Antares)', ra0: 247.350, dec0: -26.432, mag: 1.05, color: '#FF6040', myth: 'Guarded the entrance to the underworld and punished humans who broke sacred contracts.', mass: '11.2 M☉', distance: '550 ly', radius: '680 R☉' },
  { name: 'Kakkab PA.BIL.SAG (The Defender)', modern: 'Sigma Sagittarii', ra0: 283.813, dec0: -26.297, mag: 2.05, color: '#FFB880', myth: 'The warrior aspect linked with deep winter defense and guarding celestial borders.', mass: '7.8 M☉', distance: '228 ly', radius: '4.5 R☉' },
  { name: 'Kakkab IKU (The Field)', modern: 'Alpha Pegasi (Markab)', ra0: 346.192, dec0: 15.205, mag: 2.49, color: '#FFD0A0', myth: 'Represented the original square grid lines laid out by Ea during the architecture of creation.', mass: '3.5 M☉', distance: '140 ly', radius: '4.7 R☉' },

  // PATH OF EA (12 stars)
  { name: 'Kakkab IKUM (The Fish-Tail)', modern: 'Alpha Piscis Austrini (Fomalhaut)', ra0: 344.413, dec0: -29.622, mag: 1.16, color: '#C0E0FF', myth: 'Marked out the presence of marshlands and tracked the low southern horizon lines.', mass: '1.92 M☉', distance: '25.1 ly', radius: '1.84 R☉' },
  { name: 'Kakkab SHULLAT (Cloud Herald)', modern: 'Alpha Centauri', ra0: 219.900, dec0: -60.834, mag: -0.27, color: '#FFE0A0', myth: 'The southern twin portents that predicted river changes and massive valley storms.', mass: '1.1 M☉', distance: '4.37 ly', radius: '1.22 R☉' },
  { name: 'Kakkab Gula (The Sovereign)', modern: 'Alpha Aquarii (Sadalmelik)', ra0: 331.446, dec0: -0.320, mag: 2.95, color: '#B8D8FF', myth: 'Marked the deep cosmic ocean reservoirs feeding water down into the Euphrates.', mass: '5.1 M☉', distance: '520 ly', radius: '77.0 R☉' },
  { name: 'Kakkab ALLUT (The Turtle)', modern: 'Alpha Canis Minoris (Procyon)', ra0: 114.825, dec0: 5.225, mag: 0.34, color: '#FFE0C0', myth: 'Monitored coastal swamp changes and lower horizon points along the marsh shores.', mass: '1.5 M☉', distance: '11.4 ly', radius: '2.05 R☉' },
  { name: 'Kakkab MUSH (The Serpent)', modern: 'Alpha Hydrae (Alphard)', ra0: 141.896, dec0: -8.659, mag: 1.98, color: '#FFA870', myth: 'Represented foundation magic and structural roots stretching beneath the earth.', mass: '3.03 M☉', distance: '177 ly', radius: '50.5 R☉' },
  { name: 'Kakkab UGA (The Raven)', modern: 'Gamma Corvi (Gienah)', ra0: 183.950, dec0: -17.542, mag: 2.59, color: '#FFB070', myth: 'Its early morning rising forecast harvest damage from wind storms and rain anomalies.', mass: '4.2 M☉', distance: '165 ly', radius: '4.9 R☉' },
  { name: 'Kakkab EN.TE.NA.BAR.HUM (Mouse)', modern: 'Theta Centauri', ra0: 211.671, dec0: -36.370, mag: 2.06, color: '#FFC880', myth: 'Tied to preserving local grain storages against late autumn dampness and rodent pests.', mass: '4.0 M☉', distance: '58.8 ly', radius: '16.0 R☉' },
  { name: 'Kakkab UR.IDIM (Wild Hound)', modern: 'Alpha Lupi', ra0: 220.479, dec0: -47.388, mag: 2.30, color: '#FFB880', myth: 'Represented the multi-headed monstrous beasts guarding the underworld gates.', mass: '10.1 M☉', distance: '460 ly', radius: '8.0 R☉' },
  { name: 'Kakkab EREDU (Star of Eridu)', modern: 'Zeta Puppis', ra0: 120.896, dec0: -40.003, mag: 2.21, color: '#B8D0FF', myth: 'Managed ritual water purifications and marked the earliest city layout on earth.', mass: '22.5 M☉', distance: '1080 ly', radius: '14.0 R☉' },
  { name: 'Kakkab NUN.KI (The Confluence)', modern: 'Delta Sagittarii', ra0: 275.246, dec0: -29.828, mag: 2.72, color: '#FFB070', myth: 'The deep water meeting point where fresh water channels and salty seas mixed together.', mass: '5.0 M☉', distance: '305 ly', radius: '16.0 R☉' },
  { name: 'Kakkab SUHUR.MASH (Goat-Fish)', modern: 'Delta Capricorni', ra0: 326.758, dec0: -16.127, mag: 2.85, color: '#FFD0A0', myth: 'The personal icon of Ea, tracking the return of hidden wisdom from winter depths.', mass: '2.0 M☉', distance: '39 ly', radius: '1.9 R☉' },
  { name: 'Kakkab SIM.MAH (The Swallow)', modern: 'Epsilon Pegasi', ra0: 326.046, dec0: 9.875, mag: 2.38, color: '#FFD0A0', myth: 'Signalled early migration tracks and marked the physical end of the winter calendar.', mass: '6.7 M☉', distance: '690 ly', radius: '150 R☉' }
]
    calendar: {
      title: 'Egyptian Civil Calendar — The Sothic Cycle',
      system: 'Egypt used a civil calendar of 365 days (3 seasons × 4 months × 30 days + 5 Epagomenal Days). The Sothic cycle anchored astronomical time: every 1,460 Julian years (1,461 Egyptian years), the New Year\'s Day and Sirius\' heliacal rising coincided again.',
      math: [
        'Civil Year = 3 seasons × 4 months × 30 days + 5 epagomenal = 365 days',
        'Tropical Year ≈ 365.2422 days',
        'Drift per year = 0.2422 days (no leap year)',
        'Full calendar cycle = 365 × 4 = 1,460 years to reset',
        'Sothic Cycle (Sirius) = 1,460 Julian years = 1,461 Egyptian years',
        'Three seasons: Akhet (Flood), Peret (Growth), Shemu (Harvest)',
        'Lunar calendar also used: 29-30 day months for religious feasts'
      ],
      cycles: [
        { name: 'Civil Month', val: '30 days' },
        { name: 'Epagomenal Days', val: '5 days (gods\' birthdays)' },
        { name: 'Civil Year', val: '365 days' },
        { name: 'Sothic Cycle', val: '1,460 Julian years' },
        { name: 'Akhet (Flood season)', val: '4 months (Thoth–Choiak)' },
        { name: 'Peret (Planting season)', val: '4 months (Tybi–Pharmouthi)' },
        { name: 'Shemu (Harvest season)', val: '4 months (Pachons–Mesori)' },
        { name: 'Hour Division', val: '12 day + 12 night hours' }
      ],
      lore: 'The Pyramid Texts (c. 2400 BCE) are the oldest religious texts in the world, recording the star-knowledge embedded in pyramid architecture. The Great Pyramid\'s southern air shafts pointed to Orion\'s Belt and Thuban (then pole star) c. 2450 BCE. Dendera\'s temple ceiling (c. 50 BCE) contains the famous Circular Zodiac — the earliest complete star map, now in the Louvre. The Egyptian astronomer-priests (Kherep Serqet) tracked 36 decans — star groups rising at 10-day intervals.'
    }
  },

  greece: {
    name: 'Classical Greece',
    themeClass: 'theme-greece',
    accent: '#C8B8A0',
    bgImage: 'ChatGPT_Image_May_22__2026__12_37_58_AM.png',
    deities: [
      {
        id: 'zeus',
        name: 'Zeus & the Olympians',
        role: 'King of Olympos — Sovereign of Sky and Thunder',
        domains: ['Thunder','Lightning','Justice','Kingship'],
        img: 'ChatGPT_Image_May_22__2026__12_37_58_AM.png',
        myth: 'Zeus, son of Kronos and Rhea, was saved from being swallowed by his father by a trick of stone-substitution. He led the Olympians in the Titanomachy (war against the Titans) lasting ten years, sealing them in Tartarus. He rules from Mount Olympos with his thunderbolt forged by the Cyclopes. He is the god of hospitality (Xenia) and the divine guarantee of oaths. His eagle soars as divine messenger across both heaven and earth.',
        stats: { weapon: 'Keraunos (thunderbolt)', bird: 'Eagle', tree: 'Oak', oracle: 'Dodona (oldest Greek oracle)' }
      },
      {
        id: 'apollo',
        name: 'Apollo',
        role: 'God of the Sun, Music, Prophecy and Healing',
        domains: ['Sun','Music','Prophecy','Healing','Archery'],
        img: 'ChatGPT_Image_May_22__2026__12_24_36_AM.png',
        myth: 'Apollo, twin of Artemis, born on Delos island, slew the Python at Delphi and established the greatest oracle of the ancient world. His lyre, given by Hermes, enchanted all creation. He drives the solar chariot across the sky. Patron of the Muses, he is the god of light, reason, truth, and art. His many loves include Hyacinthus, Cassandra (whom he cursed with true prophecy never believed), and Daphne who became the laurel tree.',
        stats: { twin: 'Artemis', instrument: 'Kithara (lyre)', oracle: 'Delphi (Pythia)', chariot: 'Golden solar chariot with 4 horses' }
      },
      {
        id: 'poseidon',
        name: 'Poseidon',
        role: 'Lord of the Sea — Earth Shaker',
        domains: ['Ocean','Earthquakes','Horses','Storms'],
        img: '',
        myth: 'Poseidon rules all water realms from his underwater palace of gold and coral. He strikes the earth with his trident causing earthquakes (called "the Earth-Shaker" — Ennosigaios). He and Athena competed for patronage of Athens — he struck rock and produced a salt spring, she grew the olive tree, and the people chose her gift. Creator of horses by striking the ocean with his trident.',
        stats: { weapon: 'Trident (Triaina)', realm: 'All seas and oceans', palace: 'Aegae, beneath the Aegean', dispute: 'Lost Athens to Athena' }
      },
      {
        id: 'athena',
        name: 'Athena',
        role: 'Goddess of Wisdom and Strategic Warfare',
        domains: ['Wisdom','Craft','Strategy','Weaving','Olive'],
        img: '',
        myth: 'Athena was born fully-formed and armored from the head of Zeus after Hephaestus split his skull with an axe. She is the virgin goddess of wisdom and just warfare (as opposed to Ares\' brutal violence). Patron of Athens, she gifted humanity the olive tree. Her aegis (divine shield) bore the head of Medusa. Odysseus was her favourite mortal hero. The Parthenon on the Acropolis housed her 12-meter gold-and-ivory cult statue.',
        stats: { birth: 'From Zeus\'s head, fully armored', owl: 'Sacred animal', olive: 'Sacred tree', shield: 'Aegis with Medusa\'s head' }
      },
      {
        id: 'hermes',
        name: 'Hermes',
        role: 'Messenger of the Gods — Psychopomp',
        domains: ['Commerce','Travel','Thieves','Souls','Language'],
        img: '',
        myth: 'Hermes, born at dawn on Mount Kyllene, had stolen Apollo\'s cattle by evening and invented the lyre before sunset — an infant of extraordinary cunning. He wears winged sandals (talaria) and helmet, carries the caduceus (snake-entwined staff), and escorts souls to the underworld (Psychopomp). He invented writing, astronomy, and the lyre. He is the patron of crossroads, travellers, merchants, and thieves.',
        stats: { sandals: 'Talaria (golden wings)', staff: 'Caduceus', role: 'Messenger + Psychopomp', first_day: 'Stole Apollo\'s cattle as newborn' }
      },
      {
        id: 'ares',
        name: 'Ares',
        role: 'God of War and Bloodlust',
        domains: ['War','Violence','Courage','Destruction'],
        img: '',
        myth: 'Ares, the volatile god of war, revels in the carnage and chaos of battle — unlike strategic Athena. Even his father Zeus disliked him, calling him "the most hated of gods." He had children with Aphrodite including Eros (Love) and Phobos/Deimos (Fear/Dread), who became his chariot horses in battle. He was twice wounded by the mortal Diomedes with Athena\'s help during the Trojan War, retreating to Olympos wailing.',
        stats: { chariot: 'Pulled by Phobos and Deimos', father: 'Zeus', mother: 'Hera', lover: 'Aphrodite' }
      }
    ],
    stars: [
  // PTOLEMY'S ALMAGEST PRIMARY STARS (11 stars)
  { name: 'Kyon (The Dog)', modern: 'Alpha Canis Majoris (Sirius)', ra0: 101.288, dec0: -16.716, mag: -1.46, color: '#A0C8FF', myth: 'Ptolemy\'s premier tracking anchor. Celebrated by Homer and Hipparchus as the swiftest cosmic watchdog, whose scorching midsummer appearance brought heatwaves.', mass: '2.06 M☉', distance: '8.6 ly', radius: '1.71 R☉' },
  { name: 'Arktouros (The Bear Watcher)', modern: 'Alpha Boötis (Arcturus)', ra0: 213.913, dec0: 19.182, mag: -0.05, color: '#FFB060', myth: 'The eternal guardian of the northern sky, tasked with tracking and driving the Great Bear (Ursa Major) around the celestial polar axis.', mass: '1.08 M☉', distance: '36.7 ly', radius: '25.4 R☉' },
  { name: 'Aix (The Goat)', modern: 'Alpha Aurigae (Capella)', ra0: 79.171, dec0: 45.998, mag: 0.08, color: '#FFE0A0', myth: 'Represented the divine goat that nursed the infant Zeus on Crete. Its horn was broken off to become the Cornucopia, filling with endless cosmic bounty.', mass: '2.56 M☉', distance: '42.8 ly', radius: '11.98 R☉' },
  { name: 'Stachys (The Ear of Grain)', modern: 'Alpha Virginis (Spica)', ra0: 201.300, dec0: -11.161, mag: 0.98, color: '#B0D4FF', myth: 'Held in the left hand of the celestial virgin. Symbolised Demeter\'s absolute gift of harvest agriculture to civilised humanity.', mass: '11.43 M☉', distance: '250 ly', radius: '7.47 R☉' },
  { name: 'Antares (The Rival of Mars)', modern: 'Alpha Scorpionis (Antares)', ra0: 247.350, dec0: -26.432, mag: 1.05, color: '#FF6040', myth: 'Named for its intense, deep-crimson hue that closely rivalled the brilliance and erratic motion of the war planet Pyroeis (Mars).', mass: '11.2 M☉', distance: '550 ly', radius: '680 R☉' },
  { name: 'Aetos (The Eagle)', modern: 'Alpha Aquilae (Altair)', ra0: 297.696, dec0: 8.868, mag: 0.76, color: '#FFE0C0', myth: 'The massive celestial eagle that carried the lightning thunderbolts of Zeus and was sent to retrieve Ganymede to serve as cupbearer.', mass: '1.79 M☉', distance: '16.7 ly', radius: '1.63 R☉' },
  { name: 'Lyra (The Lyre)', modern: 'Alpha Lyrae (Vega)', ra0: 279.233, dec0: 38.784, mag: 0.03, color: '#C0D8FF', myth: 'The foundational stringed instrument fashioned by Hermes and played by Orpheus to charm the gods of the underworld into submission.', mass: '2.13 M☉', distance: '25 ly', radius: '2.36 R☉' },
  { name: 'Prokyon (The Forerunner)', modern: 'Alpha Canis Minoris (Procyon)', ra0: 114.825, dec0: 5.225, mag: 0.34, color: '#FFE0C0', myth: 'Literally translates to \'Before the Dog\', so named because its orbital position causes it to rise across the horizon right before Kyon (Sirius).', mass: '1.5 M☉', distance: '11.4 ly', radius: '2.05 R☉' },
  { name: 'Basiliskos (The Little King)', modern: 'Alpha Leonis (Regulus)', ra0: 152.092, dec0: 11.967, mag: 1.35, color: '#B0D0FF', myth: 'The premier imperial star of Hellenistic astrology. Ptolemy noted it as the supreme regulator of governance and martial destiny.', mass: '3.8 M☉', distance: '79.3 ly', radius: '3.0 R☉' },
  { name: 'Protrygeter (The Vintage Harbinger)', modern: 'Epsilon Virginis (Vindemiatrix)', ra0: 195.542, dec0: 10.959, mag: 2.85, color: '#FFD0A0', myth: 'Its morning appearance served as a calendar alarm telling Greek vineyards that it was time to harvest grapes for winemaking.', mass: '2.6 M☉', distance: '109.6 ly', radius: '10.6 R☉' },
  { name: 'Kanobos', modern: 'Alpha Carinae (Canopus)', ra0: 95.988, dec0: -52.696, mag: -0.74, color: '#C0E0FF', myth: 'Named for Menelaus\' naval helmsman. Sat low on the Mediterranean horizon, anchoring the steering oar of the colossal ship Argo Navis.', mass: '8.0 M☉', distance: '310 ly', radius: '71.0 R☉' },

  // EARLY GREEK ASTERISMS (5 stars)
  { name: 'Propus (The Forward Foot)', modern: 'Eta Geminorum', ra0: 93.717, dec0: 22.507, mag: 3.31, color: '#FFC880', myth: 'Tracked by Hipparchus as the projecting base line of Gemini. Marked the westernmost point where the ecliptic boundaries crossed.', mass: '2.5 M☉', distance: '350 ly', radius: '140 R☉' },
  { name: 'Kornephoros (The Club Bearer)', modern: 'Beta Herculis', ra0: 247.554, dec0: 21.489, mag: 2.77, color: '#FFD0A0', myth: 'The brightest structural anchor of the \'Kneeler\' constellation. It maps the mighty arm of Heracles as he brandishes his club.', mass: '2.9 M☉', distance: '139 ly', radius: '17.0 R☉' },
  { name: 'Aspidiske (The Little Shield)', modern: 'Iota Carinae', ra0: 139.271, dec0: -59.275, mag: 2.21, color: '#B8D0FF', myth: 'Detailed in early maritime logs as the defensive shield mount fixed onto the ornate side railing of the legendary ship Argo Navis.', mass: '7.4 M☉', distance: '690 ly', radius: '56.0 R☉' },
  { name: 'Tetrapleuron (The Quadrangle)', modern: 'Zeta Sagittarii (Ascella)', ra0: 285.650, dec0: -29.880, mag: 2.60, color: '#FFB880', myth: 'An early geometric asterism tracking the square foundational matrix forming the armpit and bow assembly of Sagittarius.', mass: '3.4 M☉', distance: '89 ly', radius: '4.5 R☉' },
  { name: 'Asterion (The Starry One)', modern: 'Beta Canum Venaticorum', ra0: 188.433, dec0: 41.357, mag: 4.24, color: '#FFE0C0', myth: 'Tracked in northern Aratus texts as a solitary beacon pacing the flanks of the Great Bear, later formalised into the hunting hounds.', mass: '1.05 M☉', distance: '27.5 ly', radius: '1.11 R☉' },

  // THE PLEIADES (9 stars)
  { name: 'Alcyone (The Leader)', modern: 'Eta Tauri', ra0: 56.871, dec0: 24.105, mag: 2.85, color: '#A0C8FF', myth: 'The central, brightest sibling nymph of the Pleiades. She was seduced by Poseidon, anchoring maritime weather changes.', mass: '6.0 M☉', distance: '440 ly', radius: '10.0 R☉' },
  { name: 'Maia (The Eldest)', modern: '20 Tauri', ra0: 56.454, dec0: 24.368, mag: 3.87, color: '#B8D8FF', myth: 'The eldest, most beautiful mountain nymph who birthed the messenger god Hermes within a cave on Mount Cyllene.', mass: '5.0 M☉', distance: '360 ly', radius: '5.5 R☉' },
  { name: 'Merope (The Mortal Sister)', modern: '23 Tauri', ra0: 56.579, dec0: 23.948, mag: 4.14, color: '#C0D8FF', myth: 'The \'Lost Pleiad\'. She hid her face in deep shame across the night sky because she chose to marry a mortal king (Sisyphus) rather than a god.', mass: '4.5 M☉', distance: '380 ly', radius: '4.3 R☉' },
  { name: 'Taygeta (The Mountain Nymph)', modern: '19 Tauri', ra0: 56.300, dec0: 24.467, mag: 4.30, color: '#C0D0FF', myth: 'To escape the lustful pursuits of Zeus, Artemis temporarily transformed Taygeta into a golden-horned doe to hide in the forests.', mass: '4.8 M☉', distance: '409 ly', radius: '4.5 R☉' },
  { name: 'Electra (The Sorrowful)', modern: '17 Tauri', ra0: 56.200, dec0: 24.113, mag: 3.72, color: '#B8D0FF', myth: 'Mother of the founder of Troy. Myth describes her tearing her hair out and dimming her star\'s light following the fiery destruction of Troy.', mass: '5.0 M☉', distance: '370 ly', radius: '6.0 R☉' },
  { name: 'Celaeno (The Dark Sibling)', modern: '16 Tauri', ra0: 56.200, dec0: 24.289, mag: 5.45, color: '#A0B8E0', myth: 'Known as the \'Swarthy One\'. Her faint magnitude required crisp Mediterranean night air for ancient navigators to glimpse her.', mass: '3.7 M☉', distance: '434 ly', radius: '4.4 R☉' },
  { name: 'Asterope (The Flashing One)', modern: '21 Tauri', ra0: 56.475, dec0: 24.555, mag: 5.76, color: '#A0B8E0', myth: 'Birthed King Oenomaus with Ares. Represented the rapid, flickering stellar scintillation across winter storm cycles.', mass: '3.0 M☉', distance: '431 ly', radius: '2.5 R☉' },
  { name: 'Atlas (The Sky Bearer)', modern: '27 Tauri', ra0: 57.296, dec0: 24.053, mag: 3.62, color: '#C0D0FF', myth: 'The Titan father forced to stand at the western edge of the world, supporting the heavy brass weight of the sky dome on his shoulders.', mass: '4.8 M☉', distance: '380 ly', radius: '5.0 R☉' },
  { name: 'Pleione (The Mother)', modern: '28 Tauri', ra0: 57.296, dec0: 24.137, mag: 5.05, color: '#B0C8F0', myth: 'The protective oceanic nymph mother who guides the cluster. Her movement guarded seafaring vessels against treacherous reef collapses.', mass: '3.4 M☉', distance: '390 ly', radius: '3.2 R☉' },

  // THE HYADES (5 stars)
  { name: 'Phaesyle (The Filtering Nymph)', modern: 'Gamma Tauri', ra0: 64.946, dec0: 15.628, mag: 3.65, color: '#FFC880', myth: 'One of the sister nymphs who wept tears of sorrow for their slain brother Hyas. Their cosmic weeping manifests on earth as seasonal rainy weather.', mass: '2.7 M☉', distance: '154 ly', radius: '13.4 R☉' },
  { name: 'Coronis (The Crowned Nymph)', modern: 'Delta1 Tauri', ra0: 65.733, dec0: 17.543, mag: 3.77, color: '#FFD090', myth: 'Transformed into a star cluster node by Zeus to preserve her safety after she helped nurture and protect the infant wine god Dionysus.', mass: '2.6 M☉', distance: '153 ly', radius: '12.8 R☉' },
  { name: 'Cleeia (The Famous Nymph)', modern: 'Theta2 Tauri', ra0: 67.163, dec0: 15.871, mag: 3.40, color: '#FFD0A0', myth: 'An integral vector point in the Hyades cluster, used by Hellenic sailors to anticipate autumn storms and rising tides.', mass: '2.4 M☉', distance: '149 ly', radius: '12.1 R☉' },
  { name: 'Phaeo (The Gleaming Nymph)', modern: 'Epsilon Tauri', ra0: 67.154, dec0: 19.180, mag: 3.53, color: '#FFD0A0', myth: 'Represents the structural left eye of the Bull. Its shifting color variations were parsed to predict severe weather changes.', mass: '2.5 M☉', distance: '147 ly', radius: '12.5 R☉' },
  { name: 'Eudora (The Generous Pourer)', modern: 'Sigma2 Tauri', ra0: 67.008, dec0: 15.962, mag: 4.67, color: '#FFC890', myth: 'Her name signifies \'rich giver\'. She commands the water distribution mechanisms that drop autumn rains onto agricultural valleys.', mass: '1.9 M☉', distance: '152 ly', radius: '2.1 R☉' }
]
    calendar: {
      title: 'Greek Lunisolar Calendar (Athenian Metonic Cycle)',
      system: 'Athens used a lunisolar calendar of 12 or 13 months, beginning at the first new moon after the summer solstice. The Metonic Cycle (Meton of Athens, 432 BCE) discovered that 19 solar years ≈ 235 lunar months, allowing precise calendar intercalation.',
      math: [
        '19 Tropical Years = 6939.6018 days',
        '235 Synodic Months = 6939.6887 days',
        'Difference = 0.087 days per 19-year cycle',
        '12 ordinary years (354 days) + 7 leap years (384 days) = 19 years',
        'Callippic Cycle: 4 × Metonic − 1 day = 76 years',
        'Hipparchan Cycle: 304 years (4 × Callippic)',
        'Olympiad: 4-year festival cycle (first: 776 BCE)'
      ],
      cycles: [
        { name: 'Athenian Lunar Month', val: '29 or 30 days' },
        { name: 'Ordinary Year', val: '354 days (12 months)' },
        { name: 'Leap Year (Embolismic)', val: '384 days (13 months)' },
        { name: 'Metonic Cycle', val: '19 years = 235 months' },
        { name: 'Callippic Cycle', val: '76 years' },
        { name: 'Olympiad', val: '4 years' },
        { name: 'Saros Cycle (eclipse)', val: '18 years 11 days' },
        { name: 'Exeligmos', val: '3 × Saros = 54 years' }
      ],
      lore: 'Hipparchus of Nicaea (c. 190–120 BCE) discovered axial precession by comparing positions of Spica with earlier Babylonian records — detecting the equinox point had moved ~2° in 150 years. Eratosthenes (c. 276–194 BCE) calculated Earth\'s circumference to within ~1% using a gnomon at Alexandria and the known distance to Syene. Aristarchus of Samos (c. 310 BCE) proposed the heliocentric model 1,800 years before Copernicus.'
    }
  },

  babylon: {
    name: 'Babylonia',
    themeClass: 'theme-babylon',
    accent: '#C4613A',
    bgImage: '',
    deities: [
      {
        id: 'marduk',
        name: 'Marduk',
        role: 'Supreme God of Babylon — Lord of the Universe',
        domains: ['Creation','Magic','Justice','Water'],
        img: '',
        myth: 'Marduk, champion of the younger gods, slew the primordial chaos-dragon Tiamat and from her split body fashioned heaven and earth — as described in the Enuma Elish (c. 1100 BCE), the great Babylonian creation epic. He established 50 divine names (one for each of his powers), fixed the stars in their courses, and created humanity from the blood of Kingu to serve the gods. Babylon\'s great ziggurat Etemenanki ("House of the foundation of heaven and earth") was his temple-mountain.',
        stats: { weapon: 'Marru (spade)', animal: 'Dragon (Mushhushshu)', planet: 'Jupiter', text: 'Enuma Elish' }
      },
      {
        id: 'ishtar',
        name: 'Ishtar / Inanna',
        role: 'Goddess of Love, War and Venus',
        domains: ['Love','War','Venus','Fertility','Power'],
        img: '',
        myth: 'Ishtar (Sumerian: Inanna) is the most powerful goddess of Mesopotamia — goddess of erotic love and brutal warfare simultaneously. Her descent to the underworld through seven gates, surrendering an adornment at each, is one of humanity\'s oldest stories. She demanded the Bull of Heaven to slay Gilgamesh after he refused her. Her planet was Venus, appearing as morning and evening star. The Ishtar Gate of Babylon (575 BCE) was covered in lapis lazuli and depicted her sacred lions.',
        stats: { planet: 'Venus (morning + evening)', gate: 'Ishtar Gate, Babylon 575 BCE', symbol: 'Eight-pointed star', descent: '7 Gates of the Underworld' }
      },
      {
        id: 'enlil',
        name: 'Enlil',
        role: 'God of Wind and Supreme Authority',
        domains: ['Wind','Storm','Kingship','Fate','Earth'],
        img: '',
        myth: 'Enlil, "Lord of Wind," was the active executive power of the Sumerian pantheon. He separated An (sky) from Ki (earth), creating the space for life. He decreed the Great Flood (Atrahasis Epic, c. 1700 BCE) to destroy humanity — the Babylonian Noah story predates the biblical version by over a millennium. His temple Ekur ("Mountain House") at Nippur was the religious center of Sumer. He wrote fate on heavenly tablets.',
        stats: { temple: 'Ekur at Nippur', tablets: 'Tablets of Destiny', flood: 'Decreed the great deluge', realm: 'Earth and atmosphere' }
      },
      {
        id: 'nabu',
        name: 'Nabu',
        role: 'God of Writing and Prophecy',
        domains: ['Writing','Scribes','Astronomy','Prophecy'],
        img: '',
        myth: 'Nabu, son of Marduk, is the divine scribe who records the fates of all beings. His symbol is the clay tablet and stylus. He is the patron deity of the Babylonian scribal tradition — the finest astronomers and mathematicians of the ancient world. His temple at Borsippa (Ezida) was a major center of astronomical observation. Wednesday (in Latin dies Mercurii) is named for Mercury, which the Babylonians identified with Nabu.',
        stats: { planet: 'Mercury', symbol: 'Clay tablet + stylus', temple: 'Ezida at Borsippa', day: 'Wednesday (Nabu\'s Day)' }
      },
      {
        id: 'sin',
        name: 'Sin / Nanna',
        role: 'Moon God — Lord of the Calendar',
        domains: ['Moon','Calendar','Cattle','Wisdom'],
        img: '',
        myth: 'Sin (Sumerian: Nanna), the Moon God, was among the most powerful of Mesopotamian deities. His crescent chariot sailed the night sky, illuminating the darkness. He was the father of Inanna/Ishtar (the planet Venus) and Utu/Shamash (the Sun). His great temple E-gish-nu-gal stood at Ur. The Babylonian calendar was entirely lunar, with months named for his phases. His wisdom came from observing and recording the movements of all celestial bodies.',
        stats: { chariot: 'Crescent-shaped barque', children: 'Shamash (Sun) + Inanna (Venus)', temple: 'E-gish-nu-gal at Ur', symbol: 'Crescent + lunar disc' }
      },
      {
        id: 'shamash',
        name: 'Shamash / Utu',
        role: 'Sun God — God of Justice and Law',
        domains: ['Sun','Justice','Law','Divination','Truth'],
        img: '',
        myth: 'Shamash, the all-seeing sun, traverses the sky in a fiery chariot drawn by the divine horses Etana and Kibra, entering through the mountains at dawn and departing at dusk into the Underworld. As supreme judge, he stands above all human law — the famous Code of Hammurabi (c. 1754 BCE) was given to Hammurabi directly by Shamash, depicted on the stele\'s famous relief. He destroys evil with his solar rays and is the patron of diviners.',
        stats: { transport: 'Fiery chariot through sky gates', symbol: 'Winged solar disc + saw', law: 'Hammurabi Code given by Shamash', saw: 'For "cutting through" injustice' }
      }
    ],
    stars: [
  // ENLIL PATH (12 stars)
  { name: 'MUL.SIPA.ZI.AN.NA (True Shepherd)', modern: 'Alpha Orionis (Betelgeuse)', ra0: 88.792, dec0: 7.407, mag: 0.50, color: '#FF6040', myth: 'The cosmic leader of the constellations. Acts as the divine herald carrying decrees between the gods of heaven and earth.', mass: '16.5 M☉', distance: '642 ly', radius: '887 R☉' },
  { name: 'MUL.KAK.SI.SÁ (The Arrow)', modern: 'Alpha Canis Majoris (Sirius)', ra0: 101.288, dec0: -16.716, mag: -1.46, color: '#A0C8FF', myth: 'The most brilliant beacon in the sky. Its piercing ray was believed to measure the deep horizons and trigger the midsummer rain systems.', mass: '2.06 M☉', distance: '8.6 ly', radius: '1.71 R☉' },
  { name: 'MUL.BAN (The Bow)', modern: 'Alpha Carinae (Canopus)', ra0: 95.988, dec0: -52.696, mag: -0.74, color: '#C0E0FF', myth: 'The heavy war bow drawn back to protect the celestial alignment. Used to aim the arrow at chaotic cosmic monsters.', mass: '8.0 M☉', distance: '310 ly', radius: '71.0 R☉' },
  { name: 'MUL.MAR.GÍD.DA (The Wagon)', modern: 'Alpha Lyrae (Vega)', ra0: 279.233, dec0: 38.784, mag: 0.03, color: '#C0D8FF', myth: 'The permanent northern freight carriage. Its steady elevation and bright visibility tracked structural agricultural timekeeping blocks.', mass: '2.13 M☉', distance: '25 ly', radius: '2.36 R☉' },
  { name: 'MUL.UZ (The She-Goat)', modern: 'Alpha Aurigae (Capella)', ra0: 79.171, dec0: 45.998, mag: 0.08, color: '#FFE0A0', myth: 'Tied to the supreme goddess of healing and restoration. Shines directly over northern pastoral lands to bless grazing herds.', mass: '2.56 M☉', distance: '42.8 ly', radius: '11.98 R☉' },
  { name: 'MUL.ŠU.PA (The Leader)', modern: 'Alpha Boötis (Arcturus)', ra0: 213.913, dec0: 19.182, mag: -0.05, color: '#FFB060', myth: 'The majestic axis rod of Enlil\'s northern sky track. It holds structural governance over atmospheric weather and storms.', mass: '1.08 M☉', distance: '36.7 ly', radius: '25.4 R☉' },
  { name: 'MUL.KA.MÚŠ.I.KÚ.E (The Dragon\'s Mouth)', modern: 'Gamma Draconis (Eltanin)', ra0: 269.150, dec0: 51.489, mag: 2.24, color: '#FFD0A0', myth: 'The snapping maw of the primeval chaos serpent. Positioned high up in the circumpolar ceiling as a warning against rebellion.', mass: '1.7 M☉', distance: '148 ly', radius: '48.0 R☉' },
  { name: 'MUL.A.EDIN (The Crown of the Desert)', modern: 'Alpha Canum Venaticorum (Cor Caroli)', ra0: 194.008, dec0: 38.318, mag: 2.89, color: '#FFD8A0', myth: 'Marked the isolated boundary zones where the fertile valley fields dissolved into the high arid Mesopotamian plateau.', mass: '2.9 M☉', distance: '110 ly', radius: '2.5 R☉' },
  { name: 'MUL.BALAG (The Lyre)', modern: 'Beta Lyrae', ra0: 282.521, dec0: 33.364, mag: 3.52, color: '#C0D8FF', myth: 'The sacred celestial harp whose mathematical resonance maintains orderly orbits and structural peace across the sky vault.', mass: '13.0 M☉', distance: '960 ly', radius: '15.0 R☉' },
  { name: 'MUL.GIR.TAB (The Sting)', modern: 'Lambda Scorpionis (Shaula)', ra0: 263.400, dec0: -37.104, mag: 1.62, color: '#FF9060', myth: 'The lethal base of the scorpion configuration, monitoring the southern horizon line to enforce oaths and punish contract breaches.', mass: '10.4 M☉', distance: '700 ly', radius: '8.8 R☉' },
  { name: 'MUL.ŠU.GI (The Old Man)', modern: 'Zeta Persei', ra0: 58.529, dec0: 31.884, mag: 2.85, color: '#FFA870', myth: 'The primordial ancestor. Its fading elevation tracks the late-autumn transitions and the onset of winter frost.', mass: '19.0 M☉', distance: '750 ly', radius: '21.0 R☉' },
  { name: 'MUL.APIN (The Plough)', modern: 'Alpha Andromedae (Alpheratz)', ra0: 2.096, dec0: 29.091, mag: 2.06, color: '#FFC890', myth: 'Used to time the absolute beginning of field plowing and spring agricultural preparation.', mass: '3.8 M☉', distance: '97 ly', radius: '2.7 R☉' },

  // ANU PATH (12 stars)
  { name: 'MUL.LI.9 (Jaw of the Bull)', modern: 'Alpha Tauri (Aldebaran)', ra0: 68.979, dec0: 16.509, mag: 0.85, color: '#FF8040', myth: 'The Crown of the supreme sky father Anu. Marks the seasonal gate where spring turns to hot summer dust storms.', mass: '1.16 M☉', distance: '65.3 ly', radius: '44.1 R☉' },
  { name: 'MUL.MAŠ.TAB.BA.GAL.GAL (Castor)', modern: 'Alpha Geminorum (Castor)', ra0: 113.650, dec0: 31.888, mag: 1.58, color: '#FFD0A0', myth: 'The left side of the twin sentinel pair, tasked by the council of gods to guard doorways against plague spirits.', mass: '2.76 M☉', distance: '51 ly', radius: '2.4 R☉' },
  { name: 'MUL.MAŠ.TAB.BA.GAL.GAL (Pollux)', modern: 'Beta Geminorum (Pollux)', ra0: 116.329, dec0: 28.026, mag: 1.14, color: '#FFD090', myth: 'The fierce right twin weapon bearer who tracks structural balance at the threshold of the midsummer sky gate.', mass: '1.91 M☉', distance: '33.7 ly', radius: '8.8 R☉' },
  { name: 'MUL.UR.GU.LA (The Great Lion)', modern: 'Alpha Leonis (Regulus)', ra0: 152.092, dec0: 11.967, mag: 1.35, color: '#B0D0FF', myth: 'The supreme indicator for royal campaigns. Its baseline movements dictated state treaties and the safety of the monarch.', mass: '3.8 M☉', distance: '79.3 ly', radius: '3.0 R☉' },
  { name: 'MUL.ABSIN (The Furrow)', modern: 'Alpha Virginis (Spica)', ra0: 201.300, dec0: -11.161, mag: 0.98, color: '#B0D4FF', myth: 'The divine trench plowed along the Euphrates banks. Governs grain production and state harvest collection tallies.', mass: '11.43 M☉', distance: '250 ly', radius: '7.47 R☉' },
  { name: 'MUL.ZI.BA.AN.NA (The Scales)', modern: 'Beta Librae (Zubeneschamali)', ra0: 229.250, dec0: -9.383, mag: 2.61, color: '#FFC890', myth: 'The astronomical scales of cosmic justice. Tracks absolute equality across winter and spring seasonal shifts.', mass: '3.5 M☉', distance: '185 ly', radius: '4.9 R☉' },
  { name: 'MUL.ALLA (The Crab)', modern: 'Delta Cancri (Asellus Australis)', ra0: 131.171, dec0: 18.154, mag: 3.94, color: '#FFC880', myth: 'The northern peak anchor along the planet track, noted for testing the path bounds of wandering celestial bodies.', mass: '2.1 M☉', distance: '131 ly', radius: '11.0 R☉' },
  { name: 'MUL.GUB.BA (The Standing Man)', modern: 'Alpha Canis Minoris (Procyon)', ra0: 114.825, dec0: 5.225, mag: 0.34, color: '#FFE0C0', myth: 'The watchman standing right beside the Milky Way river trail, warning the lower paths of oncoming horizon floods.', mass: '1.5 M☉', distance: '11.4 ly', radius: '2.05 R☉' },
  { name: 'MUL.DAR.LUGAL (The King)', modern: 'Alpha Scorpionis (Antares)', ra0: 247.350, dec0: -26.432, mag: 1.05, color: '#FF6040', myth: 'The crimson marker regulating state borders. Shines fiercely during autumn to signal legal boundaries and judicial checks.', mass: '11.2 M☉', distance: '550 ly', radius: '680 R☉' },
  { name: 'MUL.BIR (The Kidney)', modern: 'Zeta Puppis', ra0: 120.896, dec0: -40.003, mag: 2.21, color: '#B8D0FF', myth: 'Considered the inner geometric filter sorting clean freshwater streams as they pass into the swamp systems.', mass: '22.5 M☉', distance: '1080 ly', radius: '14.0 R☉' },
  { name: 'MUL.TI8.MUŠEN (The Eagle)', modern: 'Alpha Aquilae (Altair)', ra0: 297.696, dec0: 8.868, mag: 0.76, color: '#FFE0C0', myth: 'The swift hunting raptor tracking solar paths. Relays daily human infractions back to the solar courtroom of Shamash.', mass: '1.79 M☉', distance: '16.7 ly', radius: '1.63 R☉' },
  { name: 'MUL.ŠU.PA (The Bright One)', modern: 'Gamma Virginis (Porrima)', ra0: 190.413, dec0: -1.449, mag: 2.74, color: '#FFD0A0', myth: 'The ancillary boundary beam adjacent to the furrow. Measures the exact alignment of seasonal crop growth intervals.', mass: '1.4 M☉', distance: '38.1 ly', radius: '2.0 R☉' },

  // EA PATH (12 stars)
  { name: 'MUL.NUN.KI (Divine Place of Eridu)', modern: 'Sigma Sagittarii (Nunki)', ra0: 283.813, dec0: -26.297, mag: 2.05, color: '#FFB880', myth: 'The ancient delta base marker tracking where freshwater conduits merge directly with subterranean ocean reservoirs.', mass: '7.8 M☉', distance: '228 ly', radius: '4.5 R☉' },
  { name: 'MUL.KU6 (The Fish)', modern: 'Alpha Piscis Austrini (Fomalhaut)', ra0: 344.413, dec0: -29.622, mag: 1.16, color: '#C0E0FF', myth: 'The primordial whale swimming the subterranean ocean currents. Tracks early spring moisture distributions.', mass: '1.92 M☉', distance: '25.1 ly', radius: '1.84 R☉' },
  { name: 'MUL.GULA (The Great One)', modern: 'Beta Aquarii (Sadalsuud)', ra0: 322.888, dec0: -5.571, mag: 2.90, color: '#B8D8FF', myth: 'The master matrix coordinate governing deep irrigation streams. Controls the foundational seasonal recharge of the Tigris and Euphrates rivers.', mass: '5.1 M☉', distance: '540 ly', radius: '50.0 R☉' },
  { name: 'MUL.MA.GUR8 (The Bark)', modern: 'Lambda Velorum (Suhail)', ra0: 136.996, dec0: -43.432, mag: 2.21, color: '#B8D0FF', myth: 'The deep horizon freight vessel navigating southern swamp channels to bring sacred offerings to Eridu\'s docks.', mass: '8.5 M☉', distance: '570 ly', radius: '210 R☉' },
  { name: 'MUL.AŠ.IKU (The Field Marker)', modern: 'Alpha Pegasi (Markab)', ra0: 346.192, dec0: 15.205, mag: 2.49, color: '#FFD0A0', myth: 'The fundamental baseline geometry layout used by Ea to measure and parcel the dimensions of the physical world.', mass: '3.5 M☉', distance: '140 ly', radius: '4.7 R☉' },
  { name: 'MUL.SUHUR.MASH (Goat-Fish)', modern: 'Delta Capricorni', ra0: 326.758, dec0: -16.127, mag: 2.85, color: '#FFD0A0', myth: 'The personal icon of Ea, tracking the return of hidden wisdom from winter depths.', mass: '2.0 M☉', distance: '39 ly', radius: '1.9 R☉' },
  { name: 'MUL.SIM.MAH (The Swallow)', modern: 'Epsilon Pegasi', ra0: 326.046, dec0: 9.875, mag: 2.38, color: '#FFD0A0', myth: 'Signalled early migration tracks and marked the physical end of the winter calendar.', mass: '6.7 M☉', distance: '690 ly', radius: '150 R☉' },
  { name: 'MUL.ALLUT (The Turtle)', modern: 'Alpha Canis Minoris (Procyon)', ra0: 114.825, dec0: 5.225, mag: 0.34, color: '#FFE0C0', myth: 'Monitored coastal swamp changes and lower horizon points along the marsh shores.', mass: '1.5 M☉', distance: '11.4 ly', radius: '2.05 R☉' },
  { name: 'MUL.MUSH (The Serpent)', modern: 'Alpha Hydrae (Alphard)', ra0: 141.896, dec0: -8.659, mag: 1.98, color: '#FFA870', myth: 'Represented foundation magic and structural roots stretching beneath the earth.', mass: '3.03 M☉', distance: '177 ly', radius: '50.5 R☉' },
  { name: 'MUL.UGA (The Raven)', modern: 'Gamma Corvi (Gienah)', ra0: 183.950, dec0: -17.542, mag: 2.59, color: '#FFB070', myth: 'Its early morning rising forecast harvest damage from wind storms and rain anomalies.', mass: '4.2 M☉', distance: '165 ly', radius: '4.9 R☉' },
  { name: 'MUL.EN.TE.NA.BAR.HUM (Mouse)', modern: 'Theta Centauri', ra0: 211.671, dec0: -36.370, mag: 2.06, color: '#FFC880', myth: 'Tied to preserving local grain storages against late autumn dampness and rodent pests.', mass: '4.0 M☉', distance: '58.8 ly', radius: '16.0 R☉' },
  { name: 'MUL.UR.IDIM (Wild Hound)', modern: 'Alpha Lupi', ra0: 220.479, dec0: -47.388, mag: 2.30, color: '#FFB880', myth: 'Represented the multi-headed monstrous beasts guarding the underworld gates.', mass: '10.1 M☉', distance: '460 ly', radius: '8.0 R☉' }
]
    calendar: {
      title: 'Babylonian Lunisolar Calendar & MUL.APIN Astronomy',
      system: 'The Babylonian calendar was purely lunar — months began at the first visible crescent after new moon. Intercalary months were added (by royal decree, then systematically from c. 499 BCE) to keep pace with the solar year. The 19-year cycle of intercalation was independently discovered (or borrowed) before the Greek Metonic cycle.',
      math: [
        'Babylonian Synodic Month = 29;31,50,8,20 days (sexagesimal)',
        'Converting: 29 + 31/60 + 50/3600 + 8/216000 + 20/12960000 ≈ 29.530594 days',
        'Modern value: 29.530589 days (Babylonians were within 0.0001%)',
        'Saros Cycle discovered: 223 synodic months = 18 years 11 days',
        '19-year cycle: 7 leap months in positions 3,6,8,11,14,17,19',
        'Sixtiesimal (base-60) math used for all calculations',
        'Babylonian zodiac: 12 signs × 30° = 360° (first zodiac system)'
      ],
      cycles: [
        { name: 'Babylonian Month', val: '29 or 30 days' },
        { name: 'Synodic Month (computed)', val: '29.530594 days' },
        { name: 'Solar Year', val: '365;14,44,51 days (sexagesimal)' },
        { name: 'Saros Cycle (eclipse)', val: '223 months ≈ 18 yr 11 days' },
        { name: 'Metonic Cycle', val: '235 months = 19 solar years' },
        { name: 'Great Year', val: '3600 years (Sar × 600)' },
        { name: 'Zodiac Division', val: '12 signs × 30° (invented ~450 BCE)' },
        { name: 'Daily Time Division', val: '12 double-hours (beru)' }
      ],
      lore: 'The MUL.APIN (c. 1000 BCE) is the foundational Babylonian astronomical compendium listing 66 stars and constellations, paths of the Moon through 17 stars (proto-zodiac), rising and setting dates of stars, and methods for computing intercalation. Babylonian eclipse records in cuneiform stretch back to 747 BCE without interruption — the longest continuous scientific dataset in history. Their System A and B for predicting planetary positions (c. 400 BCE) represent abstract mathematical astronomy, centuries before Hipparchus.'
    }
  },

  aztec: {
    name: 'Aztec Empire',
    themeClass: 'theme-aztec',
    accent: '#1FA8A8',
    bgImage: '',
    deities: [
      {
        id: 'huitzilopochtli',
        name: 'Huitzilopochtli',
        role: 'Solar War God — Lord of the Fifth Sun',
        domains: ['Sun','War','Sacrifice','Hummingbird','South'],
        img: '',
        myth: 'Huitzilopochtli, "Hummingbird of the South," is the Aztec sun and war god, born fully-armed from the womb of Coatlicue after his 400 siblings tried to kill her. He slew his sister Coyolxauhqui and dismembered her, throwing her body down Coatepec hill — an event re-enacted at the Templo Mayor. The sun must be fed daily with human hearts (chalchiuatl, "precious water" = blood) to fuel its journey, or it will die and the Fifth Sun will end.',
        stats: { weapon: 'Xiuhcoatl (fire serpent)', symbol: 'Eagle with obsidian mirror', feast: 'Panquetzaliztli (20-day period)', temple: 'Templo Mayor, Tenochtitlan' }
      },
      {
        id: 'quetzalcoatl',
        name: 'Quetzalcoatl',
        role: 'Feathered Serpent — God of Wind and Venus',
        domains: ['Wind','Venus','Knowledge','Morning Star','Creation'],
        img: '',
        myth: 'Quetzalcoatl, the Feathered Serpent, is one of the most ancient deities of Mesoamerica appearing at Teotihuacan c. 100–200 CE. As Ehecatl-Quetzalcoatl he is the wind that clears the path for rain gods. As the Morning Star (Tlahuizcalpantecuhtli) he battles the night to bring light. His mythic departure across the sea to the east — vowing to return in the year Ce Acatl (1 Reed) — created psychological vulnerability when Cortés arrived in 1519 CE.',
        stats: { planet: 'Venus (Morning Star)', form: 'Feathered serpent + wind deity', prophecy: 'Return in year Ce Acatl (1 Reed)', site: 'Teotihuacan, Cholula, Chichen Itza' }
      },
      {
        id: 'tlaloc',
        name: 'Tlaloc',
        role: 'Rain God — Master of Waters and Lightning',
        domains: ['Rain','Lightning','Agriculture','Fertility','Mountains'],
        img: '',
        myth: 'Tlaloc, with his goggle eyes and fanged mouth, is one of the oldest Mesoamerican deities (Olmec period). His paradise Tlalocan receives those who die by drowning, lightning, or water-related deaths — a cool, green paradise of abundance. Four smaller Tlalocs assist him, each controlling different rain types from different directions. Children were sacrificed to him — their tears as they were led to sacrifice were believed to bring rain.',
        stats: { eyes: 'Goggle rings (representing water)', paradise: 'Tlalocan (rain paradise)', assistants: '4 Tlaloque (directional rain gods)', children: 'Sacred to him (sacrificed in Atlcahualo ceremony)' }
      },
      {
        id: 'tezcatlipoca',
        name: 'Tezcatlipoca',
        role: 'Smoking Mirror — God of Night and Sorcery',
        domains: ['Night','Sorcery','Earth','Conflict','Jaguar'],
        img: '',
        myth: 'Tezcatlipoca, "Smoking Mirror," is Quetzalcoatl\'s cosmic opposite and eternal rival. His obsidian mirror reflects the sins of men and the true state of the world. He was responsible for exiling Quetzalcoatl from Tollan by showing him his aged, ugly face in the mirror. He is the Jaguar — the spotted skin of night. He is the god who set the previous four Suns in motion and destroyed each one in cosmic jealousy.',
        stats: { mirror: 'Tezcatl — obsidian smoking mirror', animal: 'Jaguar (spotted night sky)', foot: 'Lost to the Earth Monster (replaced with obsidian)', role: 'Rival and dark twin of Quetzalcoatl' }
      },
      {
        id: 'coatlicue',
        name: 'Coatlicue',
        role: 'Earth Mother — She of the Serpent Skirt',
        domains: ['Earth','Death','Rebirth','Mother','Sacrifice'],
        img: '',
        myth: 'Coatlicue, "She of the Skirt of Serpents," is the earth goddess who gave birth to the moon, stars, and Huitzilopochtli. She is depicted with a necklace of hands and hearts, a skull pendant, and clawed feet and hands. She conceived Huitzilopochtli when a ball of feathers (the soul of a sacrificed warrior) descended and impregnated her while she swept the Coatepec temple. Her massive monolithic statue (1.5m, ~8 tons) found in 1790 is one of the greatest sculptures of ancient America.',
        stats: { skirt: 'Two serpents as facing heads', necklace: 'Hands, hearts, skull pendant', size: '1.5m, ~8 metric tons (stone statue)', location: 'National Museum of Anthropology, Mexico City' }
      }
    ],
    stars: [
      { name: 'Tianquiztli', modern: 'Pleiades (η Tauri)', ra0: 56.87, dec0: 24.1, mag: 1.6, color: '#40FFFF', myth: 'Tianquiztli ("The Marketplace") — the Pleiades were central to Aztec cosmology. Every 52 years, the New Fire Ceremony (Xiuhmolpilli) waited until the Pleiades crossed the zenith at midnight on the night the 52-year cycle ended. Priests atop Huixachtlan hill watched — if they rose, the sun would rise again and the world would not end.', mass: '6 M☉', distance: '444 ly', radius: '10 R☉' },
      { name: 'Citlaltlachtli', modern: 'Orion (Scorpion constellation)', ra0: 85.19, dec0: -1.94, mag: 1.74, color: '#FF8060', myth: 'The Celestial Ballcourt — Orion\'s Belt represented the Aztec ballgame court in the sky. The ballgame (tlachtli) was a cosmic ritual — the ball represented the sun, players were gods, and losing teams were sometimes sacrificed. Orion\'s rising governed the timing of major ceremonies.', mass: '33 M☉', distance: '1260 ly', radius: '20 R☉' },
      { name: 'Xonecuilli', modern: 'Ursa Minor (Little Bear)', ra0: 217.0, dec0: 74.16, mag: 2.02, color: '#80FFFF', myth: 'Xonecuilli ("Twisted Thing") — the crooked constellation Ursa Minor represented the S-shaped constellation of the crippled god Xolotl. Its circumpolar nature (never setting in Mesoamerican latitudes) made it a reliable navigation and time-keeping reference for Aztec priests.', mass: '7.6 M☉ (Kochab)', distance: '131 ly', radius: '42.6 R☉' }
    ],
    calendar: {
      title: 'Aztec Dual Calendar — Tonalpohualli & Xiuhpohualli',
      system: 'The Aztecs operated two interlocking calendars simultaneously: the 260-day sacred Tonalpohualli (20 day-signs × 13 numbers) and the 365-day solar Xiuhpohualli (18 months × 20 days + 5 nemontemi). These meshed like cogwheels, producing a unique date once every 52 years (18,980 days) — the Calendar Round.',
      math: [
        'Tonalpohualli = 20 day-signs × 13 day-numbers = 260 days',
        'Xiuhpohualli = 18 months × 20 days + 5 nemontemi = 365 days',
        'Calendar Round = LCM(260, 365) = 18,980 days = 52 years',
        'Venus cycle = 583.92 days ≈ 8 solar years = 5 Venus synodic years',
        '5 Venus cycles = 8 solar years = 2920 days',
        'Venus Great Cycle = 104 years (2 Calendar Rounds)',
        'Long Count in Aztec context: computed back to 4 Ahau 8 Cumku'
      ],
      cycles: [
        { name: 'Tonalpohualli (sacred)', val: '260 days (20 × 13)' },
        { name: 'Xiuhpohualli (solar)', val: '365 days (18×20 + 5)' },
        { name: 'Calendar Round', val: '18,980 days = 52 years' },
        { name: 'Nemontemi (unlucky days)', val: '5 days at year end' },
        { name: 'Venus Synodic Period', val: '583.92 days' },
        { name: 'Venus–Solar Cycle', val: '8 solar years = 5 Venus cycles' },
        { name: 'New Fire Ceremony', val: 'Every 52 solar years' },
        { name: 'Aztec Sun Ages', val: '5 Suns (current = 5th)' }
      ],
      lore: 'The Aztec Sun Stone (incorrectly called "Calendar Stone") is a 3.6m, 24-ton basalt disc carved c. 1427 CE depicting the Five Suns cosmology. The four previous suns (4 Jaguar, 4 Wind, 4 Rain, 4 Water) were each destroyed by the gods. The current Fifth Sun (4 Earthquake, or Nahui Ollin) is fated to end in earthquakes. The New Fire Ceremony at the end of each 52-year bundle was the most terrifying Aztec ritual — all fires extinguished, pregnant women locked away lest they become monsters, and the entire empire held its breath waiting for the Pleiades.'
    }
  },

  maya: {
    name: 'Maya Civilization',
    themeClass: 'theme-maya',
    accent: '#2E8B57',
    bgImage: '',
    deities: [
      {
        id: 'itzamna',
        name: 'Itzamna',
        role: 'Lord of the Heavens — Supreme Creator',
        domains: ['Creation','Writing','Healing','Divination','Day'],
        img: '',
        myth: 'Itzamna ("Iguana House") is the supreme Maya deity — the aged creator god who invented writing, the calendar, and medicine. He is the lord of the celestial realm, day and night. His consort is Ix Chel, the moon goddess. He transforms into the Milky Way serpent. As the first shaman, he can resurrect the dead. The Yucatec Maya believed he created the first humans from maize and was responsible for all cultural inventions.',
        stats: { consort: 'Ix Chel (moon goddess)', symbol: 'Serpent body with crocodile head', domain: 'Upperworld (13 heavens)', inventions: 'Writing, calendars, medicine' }
      },
      {
        id: 'kukulkan',
        name: 'Kukulkan',
        role: 'Feathered Serpent — Lord of Wind and Water',
        domains: ['Wind','Creation','Knowledge','Maize','Venus'],
        img: '',
        myth: 'Kukulkan, the Yucatec Maya equivalent of Quetzalcoatl, is the feathered serpent deity whose descending shadow on the staircase of the El Castillo pyramid at Chichen Itza during the spring equinox creates a spectacular serpent of light — the return of Kukulkan to earth. He governs the four cardinal directions and the ceiba tree (world tree). The pyramid\'s 365 steps, 52 panels, and 18 terraces encode the Maya calendar.',
        stats: { pyramid: 'El Castillo, Chichen Itza', equinox: 'Serpent shadow descends steps', steps: '365 (+ 1 platform = 365 total)', panels: '52 (calendar round years)' }
      },
      {
        id: 'hunahpu',
        name: 'Hunahpu & Xbalanque',
        role: 'Hero Twins — Conquerors of the Underworld',
        domains: ['Sun','Moon','Maize','Ballgame','Death'],
        img: '',
        myth: 'The Hero Twins of the Popol Vuh defeated the Lords of Xibalba (underworld) through cunning. Hunahpu (the Sun) and Xbalanque (the Moon/Venus) were born from the spit of their father\'s severed head (Hun Hunahpu, the Maize God) that fertilized their mother Blood Moon. After defeating Seven Macaw and the demons of Xibalba, they ascended to become the Sun and Moon. Their story encodes the Maya astronomical understanding of solar and lunar cycles.',
        stats: { father: 'Hun Hunahpu (Maize God)', text: 'Popol Vuh (K\'iche\' Maya)', fate: 'Became Sun and Moon', ballgame: 'Played in Xibalba to save the dead' }
      },
      {
        id: 'ixchel',
        name: 'Ix Chel',
        role: 'Goddess of the Moon, Medicine and Weaving',
        domains: ['Moon','Medicine','Weaving','Rain','Fertility'],
        img: '',
        myth: 'Ix Chel ("Lady Rainbow") is the aged moon goddess and consort of Itzamna. She controls floods, weaving, medicine, and childbirth. In her terrifying aspect she wears a serpent headdress and skirt of crossed bones. Her island sanctuary of Cozumel was a major Maya pilgrimage site. All Maya women made the journey there at least once in their lifetime. She controls the Moon\'s influence over tides, menstruation, and planting cycles.',
        stats: { symbol: 'Crescent moon + serpent headdress', island: 'Cozumel (sacred pilgrimage)', controls: 'Floods, childbirth, medicine', consort: 'Itzamna' }
      }
    ],
    stars: [
      { name: 'Chak Ek\'', modern: 'Venus (morning/evening star)', ra0: 180.0, dec0: -2.0, mag: -4.6, color: '#80FF80', myth: 'Chak Ek\' ("Great Star" or "Red/Black Star") — Venus as Kukulkan/Quetzalcoatl. The Maya tracked Venus to within 2 hours accuracy over 500 years without telescopes. The Dresden Codex Venus Tables predict all Venus apparitions for 65 cycles (104 years). When Venus first rose as Morning Star, it was considered dangerous — associated with warfare and sacrifice. Rulers timed their wars to Venus\'s heliacal rise.', mass: '4.87×10²⁴ kg', distance: '38.2 million km (avg to Earth)', radius: '6051 km' },
      { name: 'Ak Ek\'', modern: 'Milky Way (Xibalba Be)', ra0: 270.0, dec0: -29.0, mag: 0, color: '#C8F8FF', myth: 'The Milky Way is the "Road to Xibalba" (the Black Road) and the World Tree (Wakah-Chan). When the Milky Way stood upright on the horizon at dusk in August, it represented the Crocodile Tree of creation. The Dark Rift (the dark cloud nebula in the Milky Way near Sagittarius) was the "Black Road," the entrance to the underworld.', mass: 'N/A (galaxy feature)', distance: '26,000 ly (galactic center)', radius: 'N/A' },
      { name: 'Ek\' Chuah Ek\'', modern: 'Scorpius (tail stars)', ra0: 247.35, dec0: -26.43, mag: 1.06, color: '#FF6040', myth: 'The Scorpion constellation in Maya astronomy was a great turtle or sometimes a scorpion — associated with the Underworld. Antares (heart of Scorpius) was identified with one of the Lords of Xibalba. The Maya recognized the dark nebulae as constellations — the Scorpion and the Centipede were "dark constellations" traced by the absence of stars in the Milky Way.', mass: '12.4 M☉ (Antares)', distance: '550 ly', radius: '700 R☉' }
    ],
    calendar: {
      title: 'Maya Calendar System — Tzolk\'in, Haab\' and Long Count',
      system: 'The Maya calendar system is the most sophisticated indigenous calendar ever devised. Three interlocking systems operate simultaneously: Tzolk\'in (260 days), Haab\' (365 days), and the Long Count — a linear count of days from the Creation Date (11 August 3114 BCE in the GMT correlation), capable of tracking millions of years.',
      math: [
        "Tzolk'in = 20 day-names × 13 numbers = 260 days",
        "Haab' = 18 months × 20 days + 5 Wayeb' = 365 days",
        "Calendar Round = LCM(260,365) = 18,980 days = 52 Haab' years",
        'Long Count positional notation: Bak\'tun(144000).K\'atun(7200).Tun(360).Winal(20).K\'in(1)',
        'Creation Date: 4 Ahaw 8 Kumk\'u = 0.0.0.0.0 = Aug 11, 3114 BCE',
        'Current b\'ak\'tun 14 began: Dec 21, 2012 CE (13.0.0.0.0)',
        "Maya Tropical Year: 365.2420 days (error 0.0002 vs modern 365.2422)",
        "Dresden Codex Venus: 2920 days = 8 Haab' = 5 Venus synodic cycles (583.92 days each)"
      ],
      cycles: [
        { name: "Tzolk'in (sacred)", val: '260 days (13 × 20)' },
        { name: "Haab' (civil)", val: '365 days (18×20 + 5)' },
        { name: 'Calendar Round', val: '18,980 days = 52 years' },
        { name: "K'in (day)", val: '1 day' },
        { name: "Winal (month)", val: '20 days' },
        { name: "Tun (year)", val: '360 days' },
        { name: "K'atun", val: '7,200 days = 19.7 years' },
        { name: "B'ak'tun", val: '144,000 days = 394.3 years' },
        { name: "Piktun", val: '2,880,000 days = 7,885 years' },
        { name: 'Venus Table Cycle', val: '2920 days = 8 solar years' }
      ],
      lore: 'The Dresden Codex (c. 1200–1250 CE) contains the most precise pre-telescopic astronomical tables ever produced. Its Venus Tables track the synodic cycle of Venus to an accuracy of 2 hours over 500 years. The Maya also tracked Mars (780-day synodic), and the lunar series (lunar node cycle, 6585 days = Saros) and solar eclipse warnings with precision tools only a positional number system with zero could provide. The Maya independently invented the concept of zero — a revolutionary mathematical achievement.'
    }
  },

  inca: {
    name: 'Inca Empire',
    themeClass: 'theme-inca',
    accent: '#E8C820',
    bgImage: '',
    deities: [
      {
        id: 'inti',
        name: 'Inti',
        role: 'Sun God — Father of the Inca',
        domains: ['Sun','Gold','Kingship','Agriculture','Warmth'],
        img: '',
        myth: 'Inti, the radiant Sun God, was the most important deity of the Inca Empire. The Sapa Inca (emperor) was his direct descendant — "Son of the Sun." His golden disc face radiates rays from the Coricancha temple in Cusco, the "Golden Enclosure" whose walls were sheathed in gold. The Inti Raymi festival (Festival of the Sun) at the winter solstice was the greatest religious ceremony in the Inca calendar, attended by 300,000 people.',
        stats: { temple: 'Coricancha, Cusco (golden walls)', festival: 'Inti Raymi (June solstice)', disc: 'Golden face with human features', consort: 'Mama Quilla (Moon)' }
      },
      {
        id: 'viracocha',
        name: 'Viracocha',
        role: 'Creator God — Lord of Sea and Sky',
        domains: ['Creation','Ocean','Thunder','Civilization','Wisdom'],
        img: '',
        myth: 'Viracocha rose from Lake Titicaca at the beginning of time, created the sun, moon, and stars, and fashioned humans from stone at Tiwanaku. He breathed life into the stones, sending them underground to emerge at sacred places (pacarinas). After completing creation, he walked the Andes teaching civilization, then departed across the Pacific Ocean. When Pizarro arrived in 1532, some Inca thought he might be Viracocha returning — a fateful misidentification.',
        stats: { origin: 'Rose from Lake Titicaca', creation: 'Made humans from stone at Tiwanaku', departure: 'Walked into Pacific Ocean westward', confusion: 'Mistaken for Pizarro upon Spanish arrival' }
      },
      {
        id: 'mama_quilla',
        name: 'Mama Quilla',
        role: 'Moon Goddess — Keeper of the Calendar',
        domains: ['Moon','Calendar','Women','Marriage','Tides'],
        img: '',
        myth: 'Mama Quilla ("Mother Moon"), consort of Inti, governs the Inca lunar calendar and is the patron of married women. A silver disc represented her face in the Coricancha temple, opposite Inti\'s golden disc. Lunar eclipses (when an animal attacked the moon) were occasions of great terror — Inca soldiers would make loud noises and shoot arrows at the sky to drive away the predator. The lunar calendar governed religious ceremonies and agricultural timing.',
        stats: { disc: 'Silver in Coricancha temple', festival: 'Coya Raymi (September)', eclipses: 'Attack by animal (frightened away by noise)', calendar: 'Governed religious and agricultural cycle' }
      }
    ],
    stars: [
      { name: 'Inti Huayna', modern: 'Venus (Chasca)', ra0: 180.0, dec0: -2.0, mag: -4.6, color: '#FFFF60', myth: 'Chasca ("Disheveled One") — the Inca name for Venus, the page of the Sun. As morning and evening star it announced Inti\'s departure and arrival. The Inca tracked Venus with Ceques (sacred lines radiating from the Coricancha) that aligned with celestial risings and settings across the Cusco horizon.', mass: '4.87×10²⁴ kg', distance: '38.2M km', radius: '6051 km' },
      { name: 'Orqo Ciela', modern: 'Southern Cross (Crux)', ra0: 187.8, dec0: -57.1, mag: 0.77, color: '#80C8FF', myth: 'The Southern Cross was the primary navigation star for Andean peoples. The Inca saw in the dark patches of the Milky Way a series of "dark constellations" — the Serpent (Machacuay), Toad (Hampatu), Llama (Yacana), Fox, Partridge — negative space figures traced by dust clouds rather than stars.', mass: '14.5 M☉ (Acrux)', distance: '320 ly', radius: '7.8 R☉' },
      { name: 'Yacana (Dark Llama)', modern: 'Milky Way Dark Cloud (Coalsack)', ra0: 190.0, dec0: -63.0, mag: 0, color: '#405080', myth: 'Yacana — the great dark Llama constellation traced by the Coalsack Nebula and surrounding dark clouds in the Milky Way. The Inca were unique in recognizing "dark constellations" — figures traced by the absence of stars. Yacana drinks from the sea at midnight during the zenith transit to prevent floods. A mother llama with her baby.', mass: 'Dark nebula (dust)', distance: '600 ly', radius: '4 ly extent' }
    ],
    calendar: {
      title: 'Inca Calendar — Ceque System and Solar-Lunar Integration',
      system: 'The Inca calendar was both solar and lunar, structured through the revolutionary Ceque system: 41 sacred lines radiating from the Coricancha temple through Cusco, dividing the year into segments. 328 shrines along these lines (328 = approximately 12 sidereal months) marked the passage of time.',
      math: [
        'Solar year tracked by horizon pillars (sucancas) around Cusco',
        '12 lunar months × ~27.3 days = 327.6 days (sidereal)',
        'Solar correction: 365 - 327.6 = 37.4 days of intercalation',
        'Ceque system: 41 lines × 8 shrines (average) = 328 huacas',
        '328 days ≈ 12 sidereal months (period of quipu recording)',
        'Inti Raymi: June solstice (longest night, shortest day in southern hemisphere)',
        'Coya Raymi: September equinox (month of the Queen/Moon)',
        'Horizon solar calendar: 4 towers for solstices, 4 for equinoxes'
      ],
      cycles: [
        { name: 'Inca Lunar Month', val: '30 days (approximate)' },
        { name: 'Ceque Calendar', val: '328 shrines ≈ 12 × 27.3 days' },
        { name: 'Solar Year (horizon)', val: '365 days (pillar alignment)' },
        { name: 'Inti Raymi', val: 'June solstice (solar New Year)' },
        { name: 'Coya Raymi', val: 'September equinox' },
        { name: 'Capacocha Cycle', val: 'Tied to ruler\'s death + accession' },
        { name: 'Pleiades Year', val: 'Heliacal rise governs planting' }
      ],
      lore: 'The Inca used quipus — knotted string devices — to record astronomical and calendar data. The site of Machu Picchu (c. 1450 CE) contains the famous Intihuatana stone ("Hitching Post of the Sun"), a carved granite pillar aligned to the four cardinal directions. At the equinoxes, the sun sits directly above the stone with no shadow — a physical calendar synchronised to the cosmos. The Antisuyu, Chinchaysuyu, Cuntisuyu, and Collasuyu quarters of the empire were aligned with the solstice and equinox sunrise directions.'
    }
  },

  dravidian: {
    name: 'Ancient Dravidians',
    themeClass: 'theme-dravidian',
    accent: '#B85C28',
    bgImage: '',
    deities: [
      {
        id: 'murugan',
        name: 'Murugan / Skanda',
        role: 'War God — Lord of the Young, Beauty and Valor',
        domains: ['War','Youth','Beauty','Peacock','Hills'],
        img: '',
        myth: 'Murugan, the Tamil deity par excellence, is the most venerated god of the Dravidian south. Son of Shiva and Parvati, born of the fire of six Kritika star-mothers, he defeated the demon Surapadman (split into peacock and rooster — his mount and flag) with his Vel (divine spear). The Sangam literature (3rd c. BCE – 3rd c. CE) identifies him with the kurinji landscape (mountainous hills). His six sacred abodes (Arupadaiveedu) in Tamil Nadu are major pilgrimage sites.',
        stats: { spear: 'Vel (divine lance given by Parvati)', mount: 'Peacock (Mayura) + Rooster banner', faces: '6 (Shanmukha — 6-faced)', abodes: '6 Arupadaiveedu temples, Tamil Nadu' }
      },
      {
        id: 'amman',
        name: 'Amman / Mariamman',
        role: 'Rain Goddess — Great Mother of Dravidia',
        domains: ['Rain','Smallpox','Fertility','Justice','Heat'],
        img: '',
        myth: 'Mariamman ("Mother Mary" in pre-Christian Tamil) is the ancient rain and earth goddess of the Dravidian south, pre-dating Aryan influence. She controls epidemics (especially smallpox and cholera) and brings rain and fertility. Her festivals involve firewalking (thimithi), body piercing, and possession ceremonies. She is the tutelary goddess of South Indian villages — almost every Tamil village has its own Amman temple, often the oldest structure in the settlement.',
        stats: { symbols: 'Neem leaves (sacred)', festivals: 'Pongal, firewalking (Thimithi)', controls: 'Rain, epidemics, fertility', type: 'Ancient Dravidian (pre-Aryan)' }
      },
      {
        id: 'mudalvan',
        name: 'Mudalvan / Korravai',
        role: 'Primal God of Sangam Tradition',
        domains: ['Victory','War','Paddy','Ancient Tamil'],
        img: '',
        myth: 'Korravai (Tamil: "She who cuts") is the ancient Dravidian war goddess, equivalent to Durga in Tamil tradition — a fierce victor in battle, carrying a sword and shield, her sacred animal the peacock. She rules the Mullai (pastoral) and Palai (wasteland) tinai landscapes. The Sangam age akam (interior/love) and puram (exterior/war) poetry is mapped onto five Dravidian landscapes (tinai), each presided over by different deities and associated with specific flowers, birds, and times of day.',
        stats: { landscapes: '5 Tamil Tinai (Kurinji, Mullai, Marutham, Neythal, Palai)', period: 'Sangam Age (300 BCE – 300 CE)', texts: 'Tolkappiyam, Purananuru, Akananuru', animal: 'Peacock (in Mullai tinai)' }
      }
    ],
    stars: [
      { name: 'Velli', modern: 'Venus (Tamil)', ra0: 180.0, dec0: -2.0, mag: -4.6, color: '#FFD080', myth: 'Velli ("Silver") — Venus in Tamil astronomy. The ancient Tamil Sangam poems reference Velli as the bright silver star heralding dawn in the Mullai (pastoral) landscape, sung by shepherdesses awaiting their lovers.', mass: '4.87×10²⁴ kg', distance: '38.2M km', radius: '6051 km' },
      { name: 'Rohini (Tamil)', modern: 'Aldebaran (α Tauri)', ra0: 68.98, dec0: 16.5, mag: 0.85, color: '#FF8040', myth: 'Shared with Vedic tradition — Rohini is the red star of the harvest moon and the nakshatra of the planting season. In Tamil tradition associated with Karthigai Deepam (Festival of Lights in Karthikai month, November–December).', mass: '16.2 M☉', distance: '65 ly', radius: '44 R☉' },
      { name: 'Karthigai', modern: 'Pleiades (η Tauri)', ra0: 56.87, dec0: 24.1, mag: 2.87, color: '#C0D0FF', myth: 'Karthigai — the Pleiades in Tamil, the star-cluster of the Karthigai festival (November–December), when millions of oil lamps are lit across Tamil Nadu. The six stars are the six mothers who nursed Murugan. The Karthigai Deepam festival at Tiruvannamalai sees a huge beacon lit atop the hill visible for 30km.', mass: '6 M☉', distance: '444 ly', radius: '10 R☉' }
    ],
    calendar: {
      title: 'Tamil Calendar — Panchangam and the 60-Year Cycle',
      system: 'The Tamil calendar is a lunisolar system based on the 60-year (Sashti Abdha) cycle of Jupiter, integrated with Vedic Panchanga elements. The Tamil solar month begins when the sun transits into each zodiac sign (Rashi Sankraman). Month names are derived from the ruling nakshatra at full moon.',
      math: [
        'Tamil Solar Month = Sun\'s transit through each rashi (zodiac sign)',
        'Average Tamil solar month = 30.44 days (varies by elliptical orbit)',
        'Tamil Year = 12 solar months (365.25 days approximately)',
        'Jupiter takes ~11.86 years to orbit Sun',
        '60-year cycle = 5 × 12 (Jupiter years) = ~59.3 Jupiter years ≈ 60 solar years',
        'Yugadi (Tamil New Year) = Day after Amavasya (new moon) in Chithirai',
        'Pongal = Winter solstice + 23 days (Uttarayan, when sun enters Capricorn)'
      ],
      cycles: [
        { name: 'Tamil Solar Month', val: '~30.44 days (solar)' },
        { name: 'Lunar Month (Tamil)', val: '29.53 days' },
        { name: 'Tamil Solar Year', val: '365.25 days' },
        { name: 'Jupiter Sidereal Period', val: '11.862 solar years' },
        { name: '60-Year Cycle (Sashti Abdha)', val: '60 Tamil years' },
        { name: 'Pongal (Winter Solstice festival)', val: 'Jan 14–15 (solar)' },
        { name: 'Karthigai Deepam', val: 'Full moon in Karthikai month' },
        { name: 'Aadi Perukku', val: '18th day of Aadi month (river festival)' }
      ],
      lore: 'The Tolkappiyam (c. 3rd century BCE), the oldest extant Tamil grammar, maps the poetic landscape (Akam/Puram) onto astronomical time. The five tinai landscapes correspond to five times of day, five seasons, and five star groups. Tamil astronomers independently developed the Surya Siddhanta (c. 400 CE) astronomical system, calculating the sidereal year to extraordinary precision. Thiruvalluvar\'s Tirukkural, written c. 200 BCE–200 CE, references celestial order as the foundation of ethical life.'
    }
  },

  seasia: {
    name: 'SE Asia (Khmer/Srivijaya)',
    themeClass: 'theme-seasia',
    accent: '#28A878',
    bgImage: '',
    deities: [
      {
        id: 'shiva_khmer',
        name: 'Shiva-Maheshvara (Khmer)',
        role: 'Supreme God of Angkor — Lord of the Mountain',
        domains: ['Destruction','Renewal','Yoga','Mountain','Lingam'],
        img: '',
        myth: 'The Khmer Empire (802–1431 CE) centered its state religion on Devaraja — the divine king as embodiment of Shiva. Angkor Wat and Angkor Thom were built as physical mandalas of Mount Meru — the cosmic axis. Shiva\'s lingam was placed at the geometric center of the capital, as the meeting point of heaven and earth. The Bayon temple\'s 216 smiling faces represent the Bodhisattva Lokeshvara. The Khmer merged Shaivism, Vaishnavism, and Mahayana Buddhism across centuries.',
        stats: { temple: 'Angkor Wat (largest religious monument on Earth)', system: 'Devaraja cult (god-king)', axis: 'Mount Meru cosmic mountain', alignment: 'West-east equinox sunrise' }
      },
      {
        id: 'vishnu_khmer',
        name: 'Vishnu (Khmer Vaishnava)',
        role: 'Preserver — Cosmic Sustainer of Angkor',
        domains: ['Preservation','Order','Cosmic Ocean','Kingship'],
        img: '',
        myth: 'Angkor Wat (12th century CE) is dedicated to Vishnu — unique among Khmer temples, it faces west (direction of Vishnu and of death/sunset). Its galleries depict the Churning of the Ocean of Milk (Samudra Manthan) — gods and demons pulling Vasuki the serpent around Mount Mandara to produce amrita (immortal nectar). The central tower represents Mount Meru. Its western orientation aligns the sanctuary with the spring equinox sunset.',
        stats: { temple: 'Angkor Wat — largest Hindu temple ever built', west_facing: 'Equinox sunset alignment', gallery: 'Churning of Ocean (49m bas-relief)', moat: '200m wide, 5.5km perimeter' }
      },
      {
        id: 'lokeshvara',
        name: 'Lokeshvara / Avalokitesvara',
        role: 'Bodhisattva of Compassion — Face of the Bayon',
        domains: ['Compassion','Buddhism','Wisdom','All Directions'],
        img: '',
        myth: 'Lokeshvara ("Lord of the World"), the Bodhisattva of infinite compassion in Mahayana Buddhism, was the presiding divinity of Jayavarman VII\'s Buddhist Angkor (late 12th century). The Bayon\'s 54 towers each carry four smiling faces of Lokeshvara (or the king\'s face merged with the Bodhisattva) watching in all four cardinal directions — 216 faces total, covering the entire Khmer empire symbolically.',
        stats: { faces: '216 smiling faces at the Bayon', towers: '54 towers (symbolizing 54 provinces)', directions: 'All 4 cardinal points simultaneously', king: 'Jayavarman VII (r. 1181–1218 CE)' }
      }
    ],
    stars: [
      { name: 'Rohani (Khmer)', modern: 'Aldebaran (α Tauri)', ra0: 68.98, dec0: 16.5, mag: 0.85, color: '#40FF80', myth: 'Angkor\'s temples were oriented using rising and setting points of significant stars. Researchers have proposed that the Phnom Bakheng temple (c. 900 CE) encodes astronomical numbers: 5 towers = 5 Pandavas / 5 planets; 108 towers around perimeter = 4 lunar phases × 27 nakshatras.', mass: '16.2 M☉', distance: '65 ly', radius: '44 R☉' },
      { name: 'Agastya (SE Asia)', modern: 'Canopus (α Carinae)', ra0: 95.99, dec0: -52.7, mag: -0.74, color: '#80FFD0', myth: 'The sage Agastya is venerated throughout Southeast Asia as the mythological transmitter of Hindu culture to the region. His star Canopus marks the southern celestial hemisphere — critical for navigating the maritime Srivijaya trade routes from Sumatra to China. Srivijayan sailors used its rising to navigate the monsoon seas.', mass: '8.5 M☉', distance: '310 ly', radius: '71 R☉' },
      { name: 'Dhruva (SE Asia)', modern: 'Polaris (α Ursae Minoris)', ra0: 37.95, dec0: 89.26, mag: 1.98, color: '#C0FFF0', myth: 'The pole star — Dhruva ("fixed") — was the navigation reference for Malay and Cham maritime empires. The Srivijayan empire (7th–13th c.) was the greatest maritime power of ancient Southeast Asia, controlling the Strait of Malacca. Their Buddhist scholars at Palembang navigated by star paths inherited from India.', mass: '5.4 M☉', distance: '433 ly', radius: '50 R☉' }
    ],
    calendar: {
      title: 'Khmer-Srivijayan Calendar — The Hindu Siddhantic System in SE Asia',
      system: 'Southeast Asian kingdoms adopted the Hindu Siddhantic calendar system (particularly the Surya Siddhanta) while integrating local traditions. The Khmer used the Saka Era (78 CE) as their epoch. The 60-year Jupiter cycle governed royal ceremonies. Angkor\'s temples function as elaborate 3D calendars encoding astronomical data in their architecture.',
      math: [
        'Saka Era begins: 78 CE (Khmer adopted)',
        'Angkor Wat gallery length: 800m = days in Jupiter synodic year?',
        'Phnom Bakheng: 108 towers = 4 × 27 nakshatras',
        'Bayon: 54 towers = navagrahas × 6, or 54 provinces',
        'Khmer lunar month: 30 days (Tithi system from Surya Siddhanta)',
        'Waxing fortnight: Suklapaksha (15 tithis)',
        'Waning fortnight: Krishnapaksha (15 tithis)',
        'Khmer intercalation: same 19-year Metonic-equivalent cycle as Vedic'
      ],
      cycles: [
        { name: 'Khmer Lunar Month', val: '29–30 days (tithi-based)' },
        { name: 'Saka Year', val: '365 days (solar)' },
        { name: 'Jupiter Sidereal Period', val: '11.862 years' },
        { name: '60-Year Cycle', val: '60 Khmer years (Jovian)' },
        { name: 'Navagraha (9 planets)', val: 'Counted in temple towers' },
        { name: 'Angkor Wat equinox', val: 'Equinox sunrise over central tower' },
        { name: 'Rainy Season (Vassa)', val: 'Buddhist 3-month retreat (lunar)' }
      ],
      lore: 'Graham Hancock and independent researchers (and mainstream archaeoastronomers including E.C. Krupp) have studied Angkor\'s celestial geometry. The five main temples of the Angkor complex — Angkor Wat, Bayon, Ta Prohm, Preah Khan, and Beng Mealea — are claimed by some to mirror the five stars of Draco as positioned in 10,500 BCE. More mainstream analysis confirms that Angkor Wat\'s western axis aligns precisely with the equinox sunrise over the central tower. The temple\'s 1,460 naga balusters (= length of one Sothic cycle) may encode Egyptian-derived astronomical knowledge through shared trade routes.'
    }
  },

  china: {
    name: 'Imperial China',
    themeClass: 'theme-china',
    accent: '#C81428',
    bgImage: '',
    deities: [
      {
        id: 'jade_emperor',
        name: 'Jade Emperor (Yu Huang)',
        role: 'Supreme Ruler of Heaven — Lord of All Deities',
        domains: ['Heaven','Justice','All Realms','Administration'],
        img: '',
        myth: 'The Jade Emperor, Yu Huang Shang Di, rules the celestial bureaucracy that mirrors the imperial Chinese government — a vast divine administration with departments, officials, and ranks. He rose to divinity after 1,750 arduous cultivation periods of 129,600 years each. He governs the Three Realms (Heaven, Earth, Underworld) from his palace in the Thirty-Third Heaven. The annual court session of all gods on the first day of the lunar new year determines the fortunes of all humans for the coming year.',
        stats: { palace: 'Lingxiao Treasure Hall (33rd Heaven)', period: 'After 1750 cycles of 129,600 years', court: 'Annual divine assembly, New Year', festival: 'Jade Emperor\'s Birthday: 9th day of 1st lunar month' }
      },
      {
        id: 'sun_wukong',
        name: 'Sun Wukong (Monkey King)',
        role: 'Great Sage Equal to Heaven — Cosmic Rebel',
        domains: ['Chaos','Wisdom','Power','Journey','Rebellion'],
        img: '',
        myth: 'Sun Wukong, born from a stone egg on the Mountain of Flowers and Fruit, fought his way to become "Great Sage Equal to Heaven" — defying the Jade Emperor\'s celestial hierarchy. He stole the Peaches of Immortality, the pills of immortality, and the Dragon King\'s magic staff (Ruyi Jingu Bang — a pillar that held up the sea, 13,000 jin). He was imprisoned under a mountain by the Buddha for 500 years, released to escort the monk Xuanzang on the Journey to the West.',
        stats: { staff: 'Ruyi Jingu Bang (8.1 tons, shrinks to pin-size)', transformations: '72 earthly transformations', eyes: 'Fire Eyes and Golden Pupils', text: 'Journey to the West (Wu Cheng\'en, 1592)' }
      },
      {
        id: 'xuanwu',
        name: 'Xuanwu',
        role: 'Dark Warrior — Lord of the North',
        domains: ['North','Winter','Water','Martial Arts','Long Life'],
        img: '',
        myth: 'Xuanwu ("Dark/Mysterious Warrior") is the guardian of the northern sky — represented by a black tortoise entwined with a serpent, symbolizing the two intertwined forces of yin and yang in their deepest form. He rules the 28 northern lunar mansions (Xiu) and the four directions\' guardian system. He achieved immortality after 42 years of fasting and cultivating the Dao on Wudang Mountain. In the Ming Dynasty he was elevated to Zhenwu Dadi — the patron deity of the dynasty.',
        stats: { symbol: 'Black tortoise + serpent (yin-yang)', direction: 'North', season: 'Winter', mountain: 'Wudang Mountain (Hubei)' }
      },
      {
        id: 'chang_e',
        name: "Chang'e",
        role: 'Moon Goddess — Lady of the Moon Palace',
        domains: ['Moon','Immortality','Beauty','Jade Rabbit'],
        img: '',
        myth: "Chang'e consumed the pill of immortality stolen from Queen Mother of the West (Xi Wangmu) to prevent the tyrant archer Hou Yi from gaining it, and floated up to the moon where she lives in the Cold Palace (Guanghan Gong) with only a jade rabbit for company. Her story has been told for over 3000 years — China's lunar missions are named Chang'e in her honor. The Mid-Autumn Festival (15th day, 8th lunar month) celebrates her ascension.",
        stats: { palace: 'Guanghan Gong (Cold Moon Palace)', companion: 'Jade Rabbit (grinding immortality medicine)', festival: 'Mid-Autumn Festival (Zhongqiu Jie)', missions: "China's lunar program named 'Chang'e'" }
      },
      {
        id: 'erlang',
        name: 'Erlang Shen',
        role: 'The Illustrious Sage — Celestial General',
        domains: ['War','Hunt','3rd Eye','Loyalty','Virtue'],
        img: '',
        myth: 'Erlang Shen, the nephew of the Jade Emperor, is the divine general who subdued Sun Wukong after all other heavenly armies failed. He has a third truth-seeing eye on his forehead and commands a divine dog who assists in battle. He slew the great flood dragon Jialong to save the people of Sichuan (mythologized from the historical engineer Li Bing who tamed the Min River). He wields a three-pointed, double-edged lance.',
        stats: { weapon: '3-pointed double-edged lance', eye: 'Third truth-seeing eye (forehead)', dog: 'Howling Celestial Dog', achievement: 'Subdued the Monkey King' }
      }
    ],
    stars: [
      { name: 'Tian Lang (Heavenly Wolf)', modern: 'Sirius (α Canis Majoris)', ra0: 101.29, dec0: -16.72, mag: -1.46, color: '#FF4060', myth: 'Tian Lang (Heavenly Wolf) — Sirius in Chinese astronomy. The Heavenly Wolf was associated with warfare, military strategy, and the hunt. It was one of the most carefully tracked stars — its position relative to the Moon determined military omens in the Shi Ji (Grand Historian\'s Records). When Tian Lang appeared exceptionally bright, it portended invasion from the north.', mass: '2.03 M☉', distance: '8.6 ly', radius: '1.711 R☉' },
      { name: 'Zhinü (Weaving Girl)', modern: 'Vega (α Lyrae)', ra0: 279.23, dec0: 38.78, mag: 0.03, color: '#C0D8FF', myth: 'Zhinü, the Weaving Girl, and Niulang (Cowherd, Altair) are separated by the Silver River (Milky Way) and allowed to meet only once a year on the 7th day of the 7th lunar month (Qixi Festival — the Chinese Valentine\'s Day). Magpies form a bridge across the Milky Way so the lovers can cross. The two stars appear as the two brightest objects flanking the Milky Way.', mass: '2.14 M☉', distance: '25 ly', radius: '2.36 R☉' },
      { name: 'Bei Ji (North Pole Star)', modern: 'Thuban (α Draconis) / Polaris', ra0: 37.95, dec0: 89.26, mag: 1.98, color: '#FFD0D0', myth: 'Bei Ji ("North Pole") — the Purple Forbidden Enclosure (Ziwei Yuan) surrounds the pole star. The Ziwei system divides the sky into three enclosures and 28 lunar mansions (Xiu). The emperor\'s Forbidden City (Zijin Cheng) was named for and aligned with the celestial Purple Palace. At 2800 BCE, Thuban (α Draconis) was the pole star — used to orient the Great Pyramid and early Chinese observations.', mass: '5.4 M☉', distance: '433 ly', radius: '50 R☉' }
    ],
    calendar: {
      title: 'Chinese Lunisolar Calendar — Heavenly Stems and Earthly Branches',
      system: 'The Chinese calendar is lunisolar — months follow the Moon, while the year tracks the Sun, with intercalary months added every ~3 years. Its most distinctive feature is the sexagenary cycle: 10 Heavenly Stems (Tiangan) × 12 Earthly Branches (Dizhi) = 60-year cycle, governing personal fate, politics, and cosmic rhythm.',
      math: [
        'Sexagenary Cycle = LCM(10,12) = 60 years',
        'Chinese Mean Synodic Month = 29.530585 days (excellent precision)',
        'Chinese Tropical Year (4th c. BCE) = 365.25 days',
        'Intercalary month (Runyue) added when no major solar term falls in month',
        '24 Solar Terms (Jieqi): sun moves 15° along ecliptic = ~15.2 days',
        'Metonic-equivalent: 7 leap months per 19 years = 235 months',
        'Jupiter 12-year cycle = matches 12 Earthly Branches (animals)',
        'Saturn 60-year period ≈ 5 × Jupiter orbit (near-coincidence)'
      ],
      cycles: [
        { name: 'Chinese Lunar Month', val: '29 or 30 days' },
        { name: '10 Heavenly Stems (Tiangan)', val: 'Jiǎ Yi Bǐng Dīng Wù Jǐ Gēng Xīn Rén Guǐ' },
        { name: '12 Earthly Branches (Dizhi)', val: 'Rat Ox Tiger Rabbit Dragon Snake Horse Goat Monkey Rooster Dog Pig' },
        { name: 'Sexagenary Cycle', val: '60 years' },
        { name: '24 Solar Terms (Jieqi)', val: '~15.2 days each (sun 15°)' },
        { name: 'Jupiter Sidereal Year', val: '11.86 years (12-branch match)' },
        { name: 'Chinese Solar Year', val: '365.2422 days' },
        { name: 'Runyue (Leap Month)', val: '7 months per 19-year cycle' }
      ],
      lore: 'The oracle bones of the Shang Dynasty (c. 1200 BCE) contain the earliest written astronomical records in China — solar and lunar eclipse observations, records of new moons, and the sexagenary cycle. The Shi Jing (Book of Odes, c. 1000 BCE) references stars as seasonal markers for agriculture. The Han Dynasty astronomer Zhang Heng (78–139 CE) built the first seismoscope and an armillary sphere driven by a water-clock. Chinese astronomers recorded supernovae that modern astronomers identify as known remnants — the Crab Nebula (SN 1054 CE) was observed as a "guest star" visible in daylight for 23 days.'
    }
  }
};

/* ============================================================
   PRECESSION ALGORITHM
   Approximate axial precession: ~1° per 71.6 years (26,000 year cycle)
   We shift star coordinates based on years from J2000.0 (year 2000 CE)
   ============================================================ */
function precess(ra, dec, yearCE) {
  const T = (yearCE - 2000) / 100; // Julian centuries from J2000
  // General precession in longitude (arcsec/century): ψ = 5029.097" + ...
  const psi = (5029.097 + 22.226 * T) * T / 3600; // degrees
  // Obliquity shift (approximate, degrees):
  const eps = 23.439 - 0.013 * T;
  // Simplified: rotate RA by precession angle, adjust DEC slightly
  const newRA = ((ra + psi) % 360 + 360) % 360;
  const decShift = 0.05 * T * Math.cos((ra * Math.PI) / 180);
  const newDec = Math.max(-89, Math.min(89, dec + decShift));
  return { ra: newRA, dec: newDec, eps };
}

/* ============================================================
   STATE
   ============================================================ */
let state = {
  activeCiv: 'vedic',
  epochYear: -2000,
  activeTab: 'calendar',
  hoveredStar: null
};

/* ============================================================
   DOM REFERENCES
   ============================================================ */
const $ = id => document.getElementById(id);
const body = document.body;
const bgLayer = $('bg-layer');
const epochDisplay = $('epoch-display');
const epochSlider = $('epoch-slider');
const deityGrid = $('deity-grid');
const deityTitle = $('deity-section-title');
const starmapCanvas = $('starmap-canvas');
const starmapCtx = starmapCanvas.getContext('2d');
const starInfoBar = $('star-info-bar');
const calendarContent = $('calendar-content');
const cyclesContent = $('cycles-content');
const loreContent = $('lore-content');
const footerCivName = $('footer-civ-name');
const modalOverlay = $('modal-overlay');
const modalContent = $('modal-content');
const modalClose = $('modal-close');

/* ============================================================
   AMBIENT STAR CANVAS (background)
   ============================================================ */
const starBgCanvas = $('star-canvas');
const starBgCtx = starBgCanvas.getContext('2d');
let bgStars = [];

function initBgStars() {
  starBgCanvas.width = window.innerWidth;
  starBgCanvas.height = window.innerHeight;
  bgStars = [];
  for (let i = 0; i < 380; i++) {
    bgStars.push({
      x: Math.random() * starBgCanvas.width,
      y: Math.random() * starBgCanvas.height,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random(),
      da: (Math.random() - 0.5) * 0.004
    });
  }
}

function drawBgStars() {
  starBgCtx.clearRect(0, 0, starBgCanvas.width, starBgCanvas.height);
  bgStars.forEach(s => {
    s.a += s.da;
    if (s.a > 1) { s.a = 1; s.da *= -1; }
    if (s.a < 0.1) { s.a = 0.1; s.da *= -1; }
    starBgCtx.beginPath();
    starBgCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    starBgCtx.fillStyle = `rgba(255,255,255,${s.a})`;
    starBgCtx.fill();
  });
  requestAnimationFrame(drawBgStars);
}

window.addEventListener('resize', () => {
  initBgStars();
});

/* ============================================================
   STARMAP RENDERER
   ============================================================ */
let starmapStars = []; // {x, y, r, color, name, modern, data}

function drawStarmap() {
  const civ = CIVS[state.activeCiv];
  const W = starmapCanvas.width;
  const H = starmapCanvas.height;
  starmapCtx.clearRect(0, 0, W, H);

  // Background gradient
  const grad = starmapCtx.createRadialGradient(W/2, H/2, 0, W/2, H/2, W/2);
  grad.addColorStop(0, '#0a0a20');
  grad.addColorStop(1, '#010108');
  starmapCtx.fillStyle = grad;
  starmapCtx.fillRect(0, 0, W, H);

  // Draw grid lines (RA/DEC)
  starmapCtx.strokeStyle = 'rgba(255,255,255,0.04)';
  starmapCtx.lineWidth = 0.5;
  for (let i = 0; i <= 6; i++) {
    const x = (i / 6) * W;
    starmapCtx.beginPath();
    starmapCtx.moveTo(x, 0);
    starmapCtx.lineTo(x, H);
    starmapCtx.stroke();
  }
  for (let i = 0; i <= 4; i++) {
    const y = (i / 4) * H;
    starmapCtx.beginPath();
    starmapCtx.moveTo(0, y);
    starmapCtx.lineTo(W, y);
    starmapCtx.stroke();
  }

  // Milky Way smear
  const mwGrad = starmapCtx.createLinearGradient(0, H * 0.6, W, H * 0.2);
  mwGrad.addColorStop(0, 'rgba(100,120,200,0.0)');
  mwGrad.addColorStop(0.3, 'rgba(100,120,200,0.06)');
  mwGrad.addColorStop(0.6, 'rgba(140,160,240,0.10)');
  mwGrad.addColorStop(1, 'rgba(100,120,200,0.0)');
  starmapCtx.fillStyle = mwGrad;
  starmapCtx.fillRect(0, 0, W, H);

  // Background random field stars
  const rng = (seed) => { let s = seed; return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; };
  const rand = rng(42 + state.epochYear);
  for (let i = 0; i < 200; i++) {
    const fx = rand() * W;
    const fy = rand() * H;
    const fr = rand() * 0.8 + 0.2;
    const fa = rand() * 0.4 + 0.1;
    starmapCtx.beginPath();
    starmapCtx.arc(fx, fy, fr, 0, Math.PI * 2);
    starmapCtx.fillStyle = `rgba(200,220,255,${fa})`;
    starmapCtx.fill();
  }

  // Draw civilization stars with precession
  starmapStars = [];
  const accent = CIVS[state.activeCiv].accent;

  civ.stars.forEach((star, idx) => {
    const yearCE = state.epochYear < 0 ? state.epochYear : state.epochYear;
    const p = precess(star.ra0, star.dec0, yearCE);
    // Map precessed RA (0-360) and Dec (-90 to 90) to canvas coordinates
    const x = ((p.ra / 360) * W * 1.2 - W * 0.1 + W) % W;
    const y = H * 0.5 - (p.dec / 90) * (H * 0.45);
    const r = 3.5 + (3 - star.mag) * 1.2;
    const clampedR = Math.max(2, Math.min(12, r));

    // Glow
    const glow = starmapCtx.createRadialGradient(x, y, 0, x, y, clampedR * 3);
    glow.addColorStop(0, star.color + 'CC');
    glow.addColorStop(0.5, star.color + '44');
    glow.addColorStop(1, 'transparent');
    starmapCtx.beginPath();
    starmapCtx.arc(x, y, clampedR * 3, 0, Math.PI * 2);
    starmapCtx.fillStyle = glow;
    starmapCtx.fill();

    // Star body
    starmapCtx.beginPath();
    starmapCtx.arc(x, y, clampedR, 0, Math.PI * 2);
    starmapCtx.fillStyle = star.color;
    starmapCtx.fill();

    // Label
    starmapCtx.fillStyle = 'rgba(220,200,160,0.85)';
    starmapCtx.font = `${idx === state.hoveredStar ? 'bold ' : ''}11px Cinzel, serif`;
    starmapCtx.fillText(star.name, x + clampedR + 5, y + 4);

    // Store for click detection
    starmapStars.push({ x, y, r: clampedR, star, idx });
  });
}

starmapCanvas.addEventListener('mousemove', e => {
  const rect = starmapCanvas.getBoundingClientRect();
  const sx = (e.clientX - rect.left) * (starmapCanvas.width / rect.width);
  const sy = (e.clientY - rect.top) * (starmapCanvas.height / rect.height);
  let found = false;
  starmapStars.forEach((s, i) => {
    const d = Math.sqrt((sx - s.x) ** 2 + (sy - s.y) ** 2);
    if (d < s.r * 4) {
      starmapCanvas.style.cursor = 'pointer';
      starInfoBar.innerHTML = `<strong style="color:var(--acc1)">${s.star.name}</strong> &mdash; ${s.star.modern} &mdash; Mag: ${s.star.mag} &mdash; Dist: ${s.star.distance} &mdash; <em>click for full profile</em>`;
      found = true;
    }
  });
  if (!found) {
    starmapCanvas.style.cursor = 'crosshair';
    starInfoBar.innerHTML = '<span>Click a star to reveal its cosmic profile</span>';
  }
});

starmapCanvas.addEventListener('click', e => {
  const rect = starmapCanvas.getBoundingClientRect();
  const sx = (e.clientX - rect.left) * (starmapCanvas.width / rect.width);
  const sy = (e.clientY - rect.top) * (starmapCanvas.height / rect.height);
  starmapStars.forEach(s => {
    const d = Math.sqrt((sx - s.x) ** 2 + (sy - s.y) ** 2);
    if (d < s.r * 5) openStarModal(s.star);
  });
});

/* ============================================================
   EPOCH SLIDER
   ============================================================ */
epochSlider.addEventListener('input', e => {
  state.epochYear = parseInt(e.target.value);
  updateEpochDisplay();
  drawStarmap();
});

function updateEpochDisplay() {
  const yr = state.epochYear;
  const label = yr < 0 ? `${Math.abs(yr)} BCE` : (yr === 0 ? '1 CE' : `${yr} CE`);
  epochDisplay.textContent = label;
}

/* ============================================================
   CIVILIZATION SWITCHER
   ============================================================ */
document.querySelectorAll('.civ-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.civ-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.activeCiv = btn.dataset.civ;
    loadCivilization(state.activeCiv);
  });
});

function loadCivilization(civKey) {
  const civ = CIVS[civKey];

  // Theme swap
  body.className = civ.themeClass;

  // BG image
  if (civ.bgImage) {
    bgLayer.style.backgroundImage = `url('${civ.bgImage}')`;
    bgLayer.style.opacity = '0.18';
  } else {
    bgLayer.style.backgroundImage = '';
    bgLayer.style.opacity = '0';
  }

  // Footer
  footerCivName.textContent = civ.name;

  // Deity section title
  deityTitle.textContent = `${civ.name} — Divine Pantheon`;

  // Render deities
  renderDeities(civ);

  // Render calendar
  renderCalendar(civ);

  // Redraw starmap
  drawStarmap();

  // Animate sections
  document.querySelectorAll('.deity-section, .starmap-section, .calendar-section').forEach(el => {
    el.classList.remove('section-anim');
    void el.offsetWidth;
    el.classList.add('section-anim');
  });
}

/* ============================================================
   DEITY RENDERER
   ============================================================ */
function renderDeities(civ) {
  deityGrid.innerHTML = '';
  civ.deities.forEach(deity => {
    const card = document.createElement('div');
    card.className = 'deity-card';
    card.innerHTML = `
      <div class="deity-img-wrap">
        ${deity.img
          ? `<img src="${deity.img}" alt="${deity.name}" onerror="this.style.display='none';this.parentNode.querySelector('.deity-img-placeholder').style.display='flex'" />`
          : ''}
        <div class="deity-img-placeholder" style="${deity.img ? 'display:none' : 'display:flex'}">☽</div>
      </div>
      <div class="deity-info">
        <div class="deity-name">${deity.name}</div>
        <div class="deity-role">${deity.role}</div>
        <div class="deity-domain-tags">
          ${deity.domains.map(d => `<span class="deity-tag">${d}</span>`).join('')}
        </div>
      </div>
    `;
    card.addEventListener('click', () => openDeityModal(deity));
    deityGrid.appendChild(card);
  });
}

/* ============================================================
   CALENDAR RENDERER
   ============================================================ */
function renderCalendar(civ) {
  const cal = civ.calendar;

  // Calendar tab
  calendarContent.innerHTML = `
    <div class="cal-block">
      <div class="cal-block-title">${cal.title}</div>
      <div class="cal-block-body">${cal.system}</div>
    </div>
    <div class="cal-block">
      <div class="cal-block-title">Mathematical Framework</div>
      <div class="cal-math">${cal.math.join('\n')}</div>
    </div>
  `;

  // Cycles tab
  cyclesContent.innerHTML = `
    <div class="cal-block">
      <div class="cal-block-title">Time Cycle Registry</div>
      ${cal.cycles.map(c => `
        <div class="cycle-row">
          <span class="cycle-name">${c.name}</span>
          <span class="cycle-val">${c.val}</span>
        </div>
      `).join('')}
    </div>
  `;

  // Lore tab
  loreContent.innerHTML = `
    <div class="cal-block">
      <div class="cal-block-title">Cosmic Lore & Historical Context</div>
      <div class="cal-block-body" style="font-style:normal;line-height:1.8;">${cal.lore}</div>
    </div>
  `;
}

/* ============================================================
   TAB SWITCHING
   ============================================================ */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => { p.classList.remove('active'); p.classList.add('hidden'); });
    btn.classList.add('active');
    const panel = $(`tab-${btn.dataset.tab}`);
    panel.classList.remove('hidden');
    panel.classList.add('active');
    state.activeTab = btn.dataset.tab;
  });
});

/* ============================================================
   MODALS
   ============================================================ */
function openDeityModal(deity) {
  const statsRows = Object.entries(deity.stats).map(([k, v]) => `
    <div class="modal-stat-box">
      <div class="modal-stat-label">${k.replace(/_/g, ' ')}</div>
      <div class="modal-stat-value">${v}</div>
    </div>
  `).join('');

  modalContent.innerHTML = `
    ${deity.img ? `<img class="modal-img" src="${deity.img}" alt="${deity.name}" onerror="this.style.display='none'" />` : ''}
    <div class="modal-heading">${deity.name}</div>
    <div class="modal-sub">${deity.role}</div>
    <div class="deity-domain-tags" style="margin-bottom:1rem;">
      ${deity.domains.map(d => `<span class="deity-tag">${d}</span>`).join('')}
    </div>
    <div class="modal-section-title">Divine Profile</div>
    <div class="modal-stats">${statsRows}</div>
    <div class="modal-section-title">Sacred Mythology</div>
    <div class="modal-lore">${deity.myth}</div>
  `;
  modalOverlay.classList.remove('hidden');
}

function openStarModal(star) {
  const yearCE = state.epochYear;
  const p = precess(star.ra0, star.dec0, yearCE);
  const epochLabel = yearCE < 0 ? `${Math.abs(yearCE)} BCE` : `${yearCE} CE`;
  const raHMS = decimalRaToHMS(p.ra);
  const decDMS = decimalDecToDMS(p.dec);

  modalContent.innerHTML = `
    <div style="text-align:center;margin-bottom:1rem;">
      <div style="font-size:3rem;color:${star.color};text-shadow:0 0 30px ${star.color}">★</div>
    </div>
    <div class="modal-heading">${star.name}</div>
    <div class="modal-sub">${star.modern}</div>
    <div class="modal-section-title">Stellar Data (Modern)</div>
    <div class="modal-stats">
      <div class="modal-stat-box">
        <div class="modal-stat-label">Stellar Mass</div>
        <div class="modal-stat-value">${star.mass}</div>
      </div>
      <div class="modal-stat-box">
        <div class="modal-stat-label">Distance from Earth</div>
        <div class="modal-stat-value">${star.distance}</div>
      </div>
      <div class="modal-stat-box">
        <div class="modal-stat-label">Stellar Radius</div>
        <div class="modal-stat-value">${star.radius}</div>
      </div>
      <div class="modal-stat-box">
        <div class="modal-stat-label">App. Magnitude</div>
        <div class="modal-stat-value">${star.mag}</div>
      </div>
    </div>
    <div class="modal-section-title">Precessed Coordinates — Epoch: ${epochLabel}</div>
    <div class="modal-stats">
      <div class="modal-stat-box">
        <div class="modal-stat-label">Right Ascension (RA)</div>
        <div class="modal-stat-value">${raHMS}</div>
      </div>
      <div class="modal-stat-box">
        <div class="modal-stat-label">Declination (DEC)</div>
        <div class="modal-stat-value">${decDMS}</div>
      </div>
      <div class="modal-stat-box">
        <div class="modal-stat-label">RA (J2000 baseline)</div>
        <div class="modal-stat-value">${star.ra0.toFixed(2)}°</div>
      </div>
      <div class="modal-stat-box">
        <div class="modal-stat-label">Spectral Color</div>
        <div class="modal-stat-value" style="color:${star.color}">${star.color}</div>
      </div>
    </div>
    <div class="modal-section-title">Cultural Mythology</div>
    <div class="modal-lore">${star.myth}</div>
    <div class="modal-section-title">Precession Note</div>
    <div class="modal-lore">At ${epochLabel}, this star's RA has shifted approximately ${Math.abs(p.ra - star.ra0).toFixed(1)}° from its J2000 position due to axial precession (one full cycle ≈ 25,772 years). The star rose at a different horizon point, altering the sacred alignments of temples and observatories of this civilization.</div>
  `;
  modalOverlay.classList.remove('hidden');
}

function decimalRaToHMS(ra) {
  const h = Math.floor(ra / 15);
  const m = Math.floor((ra / 15 - h) * 60);
  const s = ((ra / 15 - h) * 60 - m) * 60;
  return `${h}h ${m}m ${s.toFixed(1)}s`;
}

function decimalDecToDMS(dec) {
  const sign = dec < 0 ? '-' : '+';
  const absDec = Math.abs(dec);
  const d = Math.floor(absDec);
  const m = Math.floor((absDec - d) * 60);
  const s = ((absDec - d) * 60 - m) * 60;
  return `${sign}${d}° ${m}' ${s.toFixed(0)}"`;
}

modalClose.addEventListener('click', () => {
  modalOverlay.classList.add('hidden');
});

modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) modalOverlay.classList.add('hidden');
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') modalOverlay.classList.add('hidden');
});

/* ============================================================
   INITIALIZATION
   ============================================================ */
function init() {
  initBgStars();
  drawBgStars();
  updateEpochDisplay();
  loadCivilization('vedic');
}

init();
