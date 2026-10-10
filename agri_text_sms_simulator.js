        // --- DATA & STATE ---
        let state = 0; // Conversation flow state
        let session = { lang: 'en', service: '', location: '', produce: '', weatherPeriod: '' };

        const prompts = {
            en: {
                greeting: "Hello, welcome to Agri text.",
                askService: "Please choose an option:<br>1. Weather forecast<br>2. Produce prices",
                askWeatherPeriod: "Choose a forecast:<br>1. Daily weather<br>2. Weekly weather",
                weatherRetry: "I couldn't get that forecast for {location}. Reply 1 to retry the same request or 2 to enter a different location.",
                dailyWeatherResult: "Daily weather for {location}: {condition}, high {high}°C and low {low}°C. Rain chance: {rain}%.<br><br>{agri}",
                weeklyWeatherResult: "7-day weather forecast for {location}:<br>{days}<br><br>{season}",
                askMore: "Would you like to see the menu and make another request? Reply yes or no.",
                yesNoError: "Please reply yes or no.",
                goodbye: "Thanks for using Agri text. Press restart whenever you want to begin again.",
                askLocation: "Please enter your city, town, or SA postal code (e.g. 0700):",
                askProduce: "Which produce price would you like to check?<br>1. Tomatoes<br>2. Potatoes<br>3. Onions<br>4. Maize<br>5. Cabbage<br>6. Carrots<br>7. Apples<br>8. Other (type the produce name)",
                askOtherProduce: "Type the name of the produce you want to check:",
                priceResult: "DEMO PRICE — illustrative only, not a live market quote: {produce}: R{price} per {unit}.",
                priceNotAvailable: "There is no sample price configured for {produce}. Please choose one of the listed produce items to see an example.",
                weatherResult: "The weather for {location} is {temp}°C.<br><br>{agri}",
                error: "Invalid choice. Please try again.",
                notFound: "Sorry, we couldn't find data for '{location}'. Please check the spelling or postal code."
            },
            zu: {
                greeting: "Sawubona, wamukelekile ku-Agri text.",
                askService: "Sicela ukhethe inketho:<br>1. Isimo sezulu<br>2. Amanani omkhiqizo",
                askWeatherPeriod: "Khetha isibikezelo:<br>1. Isimo sezulu sansuku zonke<br>2. Isimo sezulu seviki",
                weatherRetry: "Angikwazanga ukuthola isibikezelo se-{location}. Phendula 1 ukuze uzame futhi ngesicelo esifanayo noma 2 ukuze ufake enye indawo.",
                dailyWeatherResult: "Isimo sezulu sanamuhla e-{location}: {condition}, izinga eliphezulu {high}°C neliphansi {low}°C. Amathuba emvula: {rain}%.<br><br>{agri}",
                weeklyWeatherResult: "Isibikezelo sezinsuku eziyi-7 e-{location}:<br>{days}<br><br>{season}",
                askMore: "Ungathanda ukubona imenyu wenze esinye isicelo? Phendula yebo noma cha.",
                yesNoError: "Sicela uphendule ngokuthi yebo noma cha.",
                goodbye: "Siyabonga ngokusebenzisa i-Agri text. Cindezela ukuqala kabusha uma ufuna ukuqala futhi.",
                askLocation: "Sicela ufake idolobha lakho noma ikhodi yeposi yase-SA (isib. 0700):",
                askProduce: "Imuphi umkhiqizo ofuna ukuwuhlolela inani?<br>1. Utamatisi<br>2. Amazambane<br>3. U-anyanisi<br>4. Ummbila<br>5. Iklabishi<br>6. Izaqathi<br>7. Ama-apula<br>8. Omunye (bhala igama lomkhiqizo)",
                askOtherProduce: "Bhala igama lomkhiqizo ofuna ukuwuhlolela inani:",
                priceResult: "INTENGO YOKUKHOMBISA — iyisibonelo kuphela, akuyona intengo yemakethe yamanje: {produce}: R{price} nge-{unit}.",
                priceNotAvailable: "Ayikho intengo yesibonelo ebekiwe ye-{produce}. Khetha omunye wemikhiqizo esohlwini ukuze ubone isibonelo.",
                weatherResult: "Isimo sezulu e-{location} singu-{temp}°C.<br><br>{agri}",
                error: "Ukukhetha okungavumelekile. Sicela uzame futhi.",
                notFound: "Uxolo, asikwazanga ukuthola idatha ye-'{location}'."
            },
            af: {
                greeting: "Hallo, welkom by Agri text.",
                askService: "Kies asseblief 'n opsie:<br>1. Weervoorspelling<br>2. Produkpryse",
                askWeatherPeriod: "Kies 'n voorspelling:<br>1. Daaglikse weer<br>2. Weeklikse weer",
                weatherRetry: "Ek kon nie die voorspelling vir {location} kry nie. Antwoord 1 om dieselfde versoek weer te probeer of 2 om 'n ander ligging in te voer.",
                dailyWeatherResult: "Daaglikse weer vir {location}: {condition}, hoog {high}°C en laag {low}°C. Reënkans: {rain}%.<br><br>{agri}",
                weeklyWeatherResult: "7-dae weervoorspelling vir {location}:<br>{days}<br><br>{season}",
                askMore: "Wil jy die kieslys sien en nog 'n versoek doen? Antwoord ja of nee.",
                yesNoError: "Antwoord asseblief ja of nee.",
                goodbye: "Dankie dat jy Agri text gebruik het. Druk herbegin wanneer jy weer wil begin.",
                askLocation: "Voer asseblief jou stad of SA poskode in (bv. 0700):",
                askProduce: "Vir watter produk wil jy die prys nagaan?<br>1. Tamaties<br>2. Aartappels<br>3. Uie<br>4. Mielies<br>5. Kool<br>6. Wortels<br>7. Appels<br>8. Ander (tik die produk se naam)",
                askOtherProduce: "Tik die naam van die produk waarvan jy die prys wil nagaan:",
                priceResult: "DEMO-PRYS — slegs 'n voorbeeld, nie 'n huidige markkwotasie nie: {produce}: R{price} per {unit}.",
                priceNotAvailable: "Daar is geen voorbeeldprys vir {produce} opgestel nie. Kies een van die produkte op die lys vir 'n voorbeeld.",
                weatherResult: "Die weer vir {location} is {temp}°C.<br><br>{agri}",
                error: "Ongeldige keuse. Probeer asseblief weer.",
                notFound: "Jammer, ons kon nie data vir '{location}' vind nie."
            },
            nso: {
                greeting: "Thobela, o amogetšwe go Agri text.",
                askService: "Ka kgopelo kgetha kgetho:<br>1. Ponelopele ya boso<br>2. Ditheko tša ditšweletšwa",
                askWeatherPeriod: "Kgetha ponelopele:<br>1. Boso bja letšatši le lengwe le le lengwe<br>2. Boso bja beke",
                weatherRetry: "Ga se ka kgona go hwetša ponelopele ya {location}. Araba 1 go leka kgopelo yeo gape goba 2 go tsenya lefelo le lengwe.",
                dailyWeatherResult: "Boso bja lehono go la {location}: {condition}, godimo {high}°C le fase {low}°C. Monyetla wa pula: {rain}%.<br><br>{agri}",
                weeklyWeatherResult: "Ponelopele ya matšatši a 7 go la {location}:<br>{days}<br><br>{season}",
                askMore: "Na o nyaka go bona lenaneo gomme wa dira kgopelo ye nngwe? Araba ee goba aowa.",
                yesNoError: "Ka kgopelo araba ee goba aowa.",
                goodbye: "Re a leboga ge o šomišitše Agri text. Kgotla go thoma leswa ge o nyaka go thoma gape.",
                askLocation: "Ka kgopelo tsenya toropo goba khoutu ya poso ya SA (mohlala 0700):",
                askProduce: "Ke setšweletšwa sefe seo o nyakago go se lekola theko ya sona?<br>1. Ditamati<br>2. Matapola<br>3. Eie<br>4. Mabele<br>5. Khabetšhe<br>6. Digwete<br>7. Diapola<br>8. Se sengwe (tlanya leina la setšweletšwa)",
                askOtherProduce: "Tlanya leina la setšweletšwa seo o nyakago go se lekola theko ya sona:",
                priceResult: "THEKO YA MOHLALA — ke mohlala fela, ga se theko ya bjale ya mmaraka: {produce}: R{price} ka {unit}.",
                priceNotAvailable: "Ga go na theko ya mohlala yeo e beetšwego {produce}. Kgetha setšweletšwa se sengwe lenaneong go bona mohlala.",
                weatherResult: "Boso bja {location} ke {temp}°C.<br><br>{agri}",
                error: "Kgetho e fošagetšego. Ka kgopelo leka gape.",
                notFound: "Re maswabi, ga re kgone go hwetša tshedimošo ya '{location}'."
            }
        };

        const agriSuggestions = {
            en: {
                sunny: "🌱 Agri Suggestion: Soil may dry quickly; ensure crops are watered. Good time for harvesting.",
                cloudy: "🌱 Agri Suggestion: Low evaporation today makes it a great time to spray fertilizers or pesticides.",
                rain: "🌱 Agri Suggestion: Rain expected. Do not spray chemicals today. Great conditions for newly planted seeds.",
                storm: "🌱 Agri Suggestion: Thunderstorms expected. Delay field work and secure loose equipment.",
                default: "🌱 Agri Suggestion: Monitor crop and soil conditions closely today."
            },
            zu: {
                sunny: "🌱 Iseluleko: Inhlabathi ingoma ngokushesha; qiniseka ukuthi izitshalo zinamanzi.",
                cloudy: "🌱 Iseluleko: Isikhathi esihle sokufafaza umanyolo ngenxa yokuhwamuka okuphansi.",
                rain: "🌱 Iseluleko: Kulindeleke imvula. Ungafafazi amakhemikhali namuhla.",
                storm: "🌱 Iseluleko: Kulindeleke ukuduma kwezulu. Hlehlisa umsebenzi wasensimini.",
                default: "🌱 Iseluleko: Gada izimo zezitshalo zakho eduze namuhla."
            },
            af: {
                sunny: "🌱 Landbou Voorstel: Grond kan vinnig uitdroog; maak seker gewasse kry water.",
                cloudy: "🌱 Landbou Voorstel: Lae verdamping maak dit 'n goeie tyd om kunsmis te spuit.",
                rain: "🌱 Landbou Voorstel: Reën word verwag. Moenie vandag chemikalieë spuit nie.",
                storm: "🌱 Landbou Voorstel: Donderstorms word verwag. Stel veldwerk uit.",
                default: "🌱 Landbou Voorstel: Monitor gewastoestande fyn vandag."
            },
            nso: {
                sunny: "🌱 Tlhagiso ya Temo: Mabu a ka oma ka pela; netefatša gore dibjalo di nošetšwa.",
                cloudy: "🌱 Tlhagiso ya Temo: Ke nako e botse ya go fafatša manyora.",
                rain: "🌱 Tlhagiso ya Temo: Go letetšwe pula. Se fafatše dikhemikhale lehono.",
                storm: "🌱 Tlhagiso ya Temo: Go letetšwe matlakadibe a pula. Šutha mešomo ya tšhemo.",
                default: "🌱 Tlhagiso ya Temo: Lekola maemo a dibjalo tša gago ka kelohloko lehono."
            }
        };

        const seasonalSuggestions = {
            en: {
                summer: "☀️ Season (summer): Watch for heat stress and check soil moisture; water during cooler hours.",
                autumn: "🍂 Season (autumn): Check crop maturity and plan harvesting and soil preparation.",
                winter: "❄️ Season (winter): Protect frost-sensitive crops and check soil before irrigating.",
                spring: "🌼 Season (spring): Prepare planting beds and monitor young crops for weeds and pests."
            },
            zu: {
                summer: "☀️ Isikhathi sasehlobo: Qaphela ukushisa kwezitshalo nomswakama womhlabathi; nisela ngezikhathi ezipholile.",
                autumn: "🍂 Isikhathi sekwindla: Hlola ukuvuthwa kwezitshalo bese uhlela ukuvuna nokulungisa umhlabathi.",
                winter: "❄️ Isikhathi sasebusika: Vikela izitshalo ezingamelani nesithwathwa futhi uhlole umhlabathi ngaphambi kokunisela.",
                spring: "🌼 Isikhathi sentwasahlobo: Lungisa izindawo zokutshala futhi uqaphe ukhula nezinambuzane ezitshalweni ezintsha."
            },
            af: {
                summer: "☀️ Seisoen (somer): Wees op die uitkyk vir hittestres en kontroleer grondvog; besproei gedurende koeler ure.",
                autumn: "🍂 Seisoen (herfs): Kontroleer gewasmaturiteit en beplan die oes en grondvoorbereiding.",
                winter: "❄️ Seisoen (winter): Beskerm rypgevoelige gewasse en kontroleer die grond voor besproeiing.",
                spring: "🌼 Seisoen (lente): Berei plantbeddings voor en monitor jong gewasse vir onkruid en peste."
            },
            nso: {
                summer: "☀️ Sehla sa selemo: Hlokomela kgateletšego ya phišo le monola wa mmu; nošetša ka dinako tša go fodile.",
                autumn: "🍂 Sehla sa seruthwane: Lekola go butšwa ga dibjalo gomme o rulaganye puno le peakanyo ya mmu.",
                winter: "❄️ Sehla sa marega: Šireletša dibjalo tšeo di sa kgotlelelego tšhwaane gomme o hlahlobe mmu pele ga go nošetša.",
                spring: "🌼 Sehla sa seruthwana: Lokišetša mafelo a go bjala gomme o hlokomele mefoka le disenyi dibjalong tše nnyane."
            }
        };

        const timeSuggestions = {
            en: {
                morning: "🕒 Timing: Early morning is a good time for irrigation and field work before the heat builds.",
                midday: "🕒 Timing: Avoid strenuous field work during the hottest hours and check crops for heat stress.",
                evening: "🕒 Timing: Cooler evening hours can be suitable for irrigation if crops need water.",
                night: "🕒 Timing: It is nighttime locally; plan irrigation and field work for daylight hours."
            },
            zu: {
                morning: "🕒 Isikhathi: Ekuseni kakhulu yisikhathi esihle sokunisela nokusebenza ensimini ngaphambi kokuba kushise.",
                midday: "🕒 Isikhathi: Gwema umsebenzi onzima ensimini ngezikhathi ezishisa kakhulu futhi uhlole izitshalo ukuthi azicindezelekile yini ngenxa yokushisa.",
                evening: "🕒 Isikhathi: Kusihlwa okupholile kungaba kuhle ukunisela uma izitshalo zidinga amanzi.",
                night: "🕒 Isikhathi: Kusebusuku endaweni yangakini; hlela ukunisela nomsebenzi wasensimini ngesikhathi sasemini."
            },
            af: {
                morning: "🕒 Tydsberekening: Vroegoggend is geskik vir besproeiing en veldwerk voordat dit warm word.",
                midday: "🕒 Tydsberekening: Vermy strawwe veldwerk gedurende die warmste ure en kyk vir hittestres by gewasse.",
                evening: "🕒 Tydsberekening: Koeler aandure kan geskik wees vir besproeiing indien gewasse water nodig het.",
                night: "🕒 Tydsberekening: Dit is plaaslik nag; beplan besproeiing en veldwerk vir dagligure."
            },
            nso: {
                morning: "🕒 Nako: Mesong ya ka pela ke nako ye botse ya go nošetša le go šoma tšhemong pele phišo e oketšega.",
                midday: "🕒 Nako: Phema mošomo o boima tšhemong ka dinako tša phišo ye kgolo gomme o lekole kgateletšego ya phišo dibjalong.",
                evening: "🕒 Nako: Mantšiboa a go fodilego a ka ba a maleba go nošetša ge dibjalo di nyaka meetse.",
                night: "🕒 Nako: Ke bošego lefelong la geno; rulaganya go nošetša le mošomo wa tšhemo nakong ya mosegare."
            }
        };

        const produceByChoice = {
            en: ['Tomatoes', 'Potatoes', 'Onions', 'Maize', 'Cabbage', 'Carrots', 'Apples'],
            zu: ['Utamatisi', 'Amazambane', 'U-anyanisi', 'Ummbila', 'Iklabishi', 'Izaqathi', 'Ama-apula'],
            af: ['Tamaties', 'Aartappels', 'Uie', 'Mielies', 'Kool', 'Wortels', 'Appels'],
            nso: ['Ditamati', 'Matapola', 'Eie', 'Mabele', 'Khabetšhe', 'Digwete', 'Diapola']
        };
        const demoProducePrices = [
            { price: 15, unit: 'kg' },
            { price: 8, unit: 'kg' },
            { price: 12, unit: 'kg' },
            { price: 5, unit: 'kg' },
            { price: 20, unit: 'head' },
            { price: 12, unit: 'kg' },
            { price: 18, unit: 'kg' }
        ];
        const producePriceUnits = {
            en: { kg: 'kg', head: 'head' },
            zu: { kg: 'kg', head: 'ikhanda' },
            af: { kg: 'kg', head: 'kop' },
            nso: { kg: 'kg', head: 'hlogo' }
        };

        const chatContainer = document.getElementById('chatContainer');
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        const typingIndicator = document.getElementById('typingIndicator');
        const restartBtn = document.getElementById('restartBtn');
        const keyCallBtn = document.getElementById('keyCallBtn');
        const keyDeleteBtn = document.getElementById('keyDeleteBtn');
        const numberKeys = document.querySelectorAll('[data-key]');
        const phoneShell = document.getElementById('phoneShell');
        const interfaceToggle = document.getElementById('interfaceToggle');
        const phoneModeLabel = document.getElementById('phoneModeLabel');
        const multiTapCharacters = {
            '1': '.,?!1',
            '2': 'ABC2',
            '3': 'DEF3',
            '4': 'GHI4',
            '5': 'JKL5',
            '6': 'MNO6',
            '7': 'PQRS7',
            '8': 'TUV8',
            '9': 'WXYZ9',
            '*': "'-@",
            '#': '()'
        };
        let lastMultiTap = { key: '', time: 0, index: 0 };

        sendBtn.addEventListener('click', handleUserSubmit);
        interfaceToggle.addEventListener('click', togglePhoneInterface);
        keyCallBtn.addEventListener('click', handleUserSubmit);
        keyDeleteBtn.addEventListener('click', () => {
            chatInput.value = chatInput.value.slice(0, -1);
            resetMultiTap();
            chatInput.focus();
        });
        numberKeys.forEach((button) => {
            let longPressTimer;

            button.addEventListener('pointerdown', () => {
                if (isNumericMenuState()) return;
                button.longPressHandled = false;
                longPressTimer = setTimeout(() => {
                    button.longPressHandled = true;
                    resetMultiTap();
                    chatInput.value += button.dataset.key;
                    chatInput.focus();
                }, 550);
            });
            button.addEventListener('pointerup', () => clearTimeout(longPressTimer));
            button.addEventListener('pointerleave', () => clearTimeout(longPressTimer));
            button.addEventListener('contextmenu', (event) => event.preventDefault());
            button.addEventListener('click', () => {
                if (button.longPressHandled) {
                    button.longPressHandled = false;
                    return;
                }

                const key = button.dataset.key;
                if (isNumericMenuState()) {
                    if (/^\d$/.test(key)) chatInput.value += key;
                } else if (key === '0') {
                    chatInput.value += ' ';
                    resetMultiTap();
                } else {
                    enterMultiTapCharacter(key);
                }
                chatInput.focus();
            });
        });
        chatInput.addEventListener('input', resetMultiTap);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleUserSubmit();
            }
        });
        restartBtn.addEventListener('click', startConversation);

        window.onload = startConversation;

        function isNumericMenuState() {
            return state === 1 || state === 2 || state === 6 || state === 8 || state === 9;
        }

        function resetMultiTap() {
            lastMultiTap = { key: '', time: 0, index: 0 };
        }

        function enterMultiTapCharacter(key) {
            const characters = multiTapCharacters[key];
            if (!characters) return;

            const now = Date.now();
            const canCycle = lastMultiTap.key === key &&
                now - lastMultiTap.time < 900 &&
                chatInput.value.length > 0;

            if (canCycle) {
                const previousCharacter = chatInput.value.slice(-1);
                const nextIndex = (lastMultiTap.index + 1) % characters.length;
                chatInput.value = chatInput.value.slice(0, -1) + characters[nextIndex];
                lastMultiTap.index = nextIndex;
                lastMultiTap.time = now;
                if (previousCharacter === ' ') resetMultiTap();
                return;
            }

            chatInput.value += characters[0];
            lastMultiTap = { key, time: now, index: 0 };
        }

        function togglePhoneInterface() {
            const touchscreenMode = phoneShell.classList.toggle('touchscreen-mode');
            interfaceToggle.setAttribute('aria-pressed', String(touchscreenMode));
            interfaceToggle.textContent = touchscreenMode ? 'Use button phone' : 'Use touchscreen';
            phoneModeLabel.textContent = touchscreenMode
                ? 'TOUCHSCREEN PHONE · DEMO ONLY'
                : 'BUTTON PHONE · DEMO ONLY';
        }

        function startConversation() {
            chatContainer.innerHTML = `
                <div class="text-center text-xs text-slate-500/70 my-2 uppercase tracking-wider font-semibold bg-black/5 rounded-full mx-auto px-3 py-1">
                    Today
                </div>`;
            state = 0;
            session = { lang: 'en', service: '', location: '', produce: '', weatherPeriod: '' };
            chatInput.value = '';
            chatInput.placeholder = 'Text first...';
            hideTyping();
        }

        function handleUserSubmit() {
            const text = chatInput.value.trim();
            if (!text) return;

            addMessage(text, 'user');
            chatInput.value = '';

            showTyping();
            setTimeout(() => {
                hideTyping();
                processBotLogic(text);
            }, 500 + Math.random() * 500);
        }

        async function processBotLogic(input) {
            const msg = input.trim().toLowerCase();
            const lang = session.lang;
            const dict = prompts[lang] || prompts['en'];

            switch (state) {
                case 0: { // User starts the conversation
                    const detectedLanguage = detectGreetingLanguage(input);
                    if (detectedLanguage) {
                        session.lang = detectedLanguage;
                        state = 2;
                        const greetingDict = prompts[session.lang];
                        addMessage(`${greetingDict.greeting}<br>${greetingDict.askService}`, 'bot');
                    } else {
                        state = 1;
                        addMessage("Hello, welcome to Agri text. Please choose your native language:<br>1. English<br>2. isiZulu<br>3. Afrikaans<br>4. Sepedi", 'bot');
                    }
                    break;
                }

                case 1: // Select Language
                    if (msg === '1') session.lang = 'en';
                    else if (msg === '2') session.lang = 'zu';
                    else if (msg === '3') session.lang = 'af';
                    else if (msg === '4') session.lang = 'nso';
                    else {
                        addMessage("Invalid choice. Please reply 1, 2, 3, or 4.", 'bot');
                        return;
                    }
                    state = 2;
                    addMessage(prompts[session.lang].askService, 'bot');
                    break;

                case 2: // Select Service
                    if (msg === '1') {
                        session.service = 'weather';
                        state = 8;
                        addMessage(dict.askWeatherPeriod, 'bot');
                    } else if (msg === '2') {
                        session.service = 'market';
                        state = 6;
                        addMessage(dict.askProduce, 'bot');
                    } else {
                        addMessage(dict.error, 'bot');
                        return;
                    }
                    break;

                case 8: // Select daily or weekly weather
                    if (msg === '1') {
                        session.weatherPeriod = 'daily';
                    } else if (msg === '2') {
                        session.weatherPeriod = 'weekly';
                    } else {
                        addMessage(dict.error, 'bot');
                        return;
                    }
                    state = 3;
                    addMessage(dict.askLocation, 'bot');
                    break;

                case 9: // Retry the previous weather request or change location
                    if (msg === '1') {
                        state = 4;
                        showTyping();
                        await fetchAndRespond(session.location);
                    } else if (msg === '2') {
                        state = 3;
                        addMessage(dict.askLocation, 'bot');
                    } else {
                        addMessage(dict.error, 'bot');
                    }
                    break;

                case 3: // Enter Location
                    if (msg === '') {
                        addMessage(`${dict.error}<br>${dict.askLocation}`, 'bot');
                        return;
                    }
                    session.location = input;
                    state = 4;
                    
                    showTyping();
                    await fetchAndRespond(input);
                    break;

                case 6: // Select produce for a price lookup
                    if (/^[1-7]$/.test(msg)) {
                        const produceChoices = produceByChoice[session.lang] || produceByChoice.en;
                        const priceIndex = Number(msg) - 1;
                        respondWithPriceInfo(produceChoices[priceIndex], priceIndex);
                    } else if (msg === '8') {
                        state = 7;
                        addMessage(dict.askOtherProduce, 'bot');
                    } else {
                        addMessage(dict.error, 'bot');
                    }
                    break;

                case 7: // Enter another produce type
                    if (!input.trim()) {
                        addMessage(dict.error, 'bot');
                        return;
                    }
                    respondWithPriceInfo(input.trim());
                    break;

                case 5: // Ask whether to make another request
                    if (['yes', 'y', '1', 'yebo', 'ja', 'ee'].includes(msg)) {
                        state = 2;
                        addMessage(dict.askService, 'bot');
                    } else if (['no', 'n', '0', 'cha', 'nee', 'aowa'].includes(msg)) {
                        state = 0;
                        addMessage(dict.goodbye, 'bot');
                    } else {
                        addMessage(dict.yesNoError, 'bot');
                    }
                    break;
            }
        }

        function detectGreetingLanguage(input) {
            const normalized = input.toLocaleLowerCase().normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/^[^\p{L}]+/u, '');
            const greetings = {
                nso: /^(dumela|dumelang|thobela)\b/,
                zu: /^(sawubona|sanibonani|molo|molweni)\b/,
                af: /^(hallo|more|goeiemore|goeiemiddag|goienaand|goeie\s+(more|middag|naand))\b/,
                en: /^(hello|hi|hey|howdy|greetings|good\s+(morning|afternoon|evening))\b/
            };

            return Object.entries(greetings).find(([, pattern]) => pattern.test(normalized))?.[0] || null;
        }

        async function fetchAndRespond(locationInput) {
            const lang = session.lang;
            const dict = prompts[lang];
            
            if (session.service === 'weather') {
                try {
                    const isPostalCode = /^\d+$/.test(locationInput.trim());
                    let lat, lon, locationName;

                    if (isPostalCode) {
                        // 1. Postal Code Lookup via Zippopotam
                        const zipRes = await fetch(`https://api.zippopotam.us/za/${locationInput.trim()}`);
                        if (!zipRes.ok) throw new Error("Postal code not found");
                        const zipData = await zipRes.json();
                        lat = zipData.places[0].latitude;
                        lon = zipData.places[0].longitude;
                        locationName = `${zipData.places[0]["place name"]}, ${zipData.places[0].state}`;
                    } else {
                        // 2. City Lookup via Open-Meteo Geocoding
                        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationInput)}&count=1&format=json`);
                        const geoData = await geoRes.json();
                        if (!geoData.results || geoData.results.length === 0) throw new Error("City not found");
                        lat = geoData.results[0].latitude;
                        lon = geoData.results[0].longitude;
                        locationName = geoData.results[0].name;
                    }

                    // 3. Fetch Weather from Open-Meteo
                    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=${session.weatherPeriod === 'weekly' ? 7 : 1}&timezone=auto`);
                    if (!weatherRes.ok) throw new Error("Weather forecast unavailable");
                    const weatherData = await weatherRes.json();
                    const localTime = weatherData.current_weather.time;
                    const daily = weatherData.daily;
                    if (!daily || !daily.time || daily.time.length === 0) {
                        throw new Error("Weather forecast data is missing");
                    }

                    let finalMsg;
                    if (session.weatherPeriod === 'weekly') {
                        const days = daily.time.map((date, index) => {
                            const dayName = new Intl.DateTimeFormat(getLocale(lang), {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                timeZone: 'UTC'
                            }).format(new Date(`${date}T00:00:00Z`));
                            const condition = getWeatherCondition(daily.weather_code[index], lang);
                            return `${dayName}: ${condition}, ${daily.temperature_2m_min[index]}–${daily.temperature_2m_max[index]}°C, ${getRainChanceLabel(lang)} ${daily.precipitation_probability_max[index] ?? 0}%`;
                        }).join('<br>');

                        finalMsg = dict.weeklyWeatherResult
                            .replace('{location}', escapeHtml(locationName))
                            .replace('{days}', days)
                            .replace('{season}', getSeasonalAdvice(localTime, lang));
                    } else {
                        const agriAdvice = [
                            getAgriAdvice(weatherData.current_weather.weathercode, lang),
                            getSeasonalAdvice(localTime, lang),
                            getTimeAdvice(localTime, lang)
                        ].join("<br>");
                        finalMsg = dict.dailyWeatherResult
                            .replace('{location}', escapeHtml(locationName))
                            .replace('{condition}', getWeatherCondition(daily.weather_code[0], lang))
                            .replace('{high}', daily.temperature_2m_max[0])
                            .replace('{low}', daily.temperature_2m_min[0])
                            .replace('{rain}', daily.precipitation_probability_max[0] ?? 0)
                            .replace('{agri}', agriAdvice);
                    }
                    
                    hideTyping();
                    addMessage(finalMsg, 'bot');
                    continueConversation();

                } catch (error) {
                    console.error("API Error:", error);
                    hideTyping();
                    state = 9;
                    addMessage(dict.weatherRetry.replace('{location}', escapeHtml(locationInput)), 'bot');
                }
            } else {
                throw new Error("Unsupported service for weather lookup");
            }
        }

        function respondWithPriceInfo(produce, priceIndex = null) {
            state = 4;
            session.produce = produce;
            const dict = prompts[session.lang] || prompts.en;
            const escapedProduce = escapeHtml(produce);
            const sample = priceIndex === null ? null : demoProducePrices[priceIndex];
            const priceMessage = sample
                ? dict.priceResult
                    .replace('{produce}', escapedProduce)
                    .replace('{price}', String(sample.price))
                    .replace('{unit}', (producePriceUnits[session.lang] || producePriceUnits.en)[sample.unit])
                : dict.priceNotAvailable.replace('{produce}', escapedProduce);
            showTyping();
            setTimeout(() => {
                hideTyping();
                addMessage(priceMessage, 'bot');
                continueConversation();
            }, 500);
        }

        function escapeHtml(value) {
            const element = document.createElement('span');
            element.textContent = value;
            return element.innerHTML;
        }

        function getAgriAdvice(code, lang) {
            let condition = "default";
            if (code <= 2) condition = "sunny";
            else if (code === 3 || code === 45 || code === 48) condition = "cloudy";
            else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) condition = "rain";
            else if (code >= 95) condition = "storm";

            const langDict = agriSuggestions[lang] || agriSuggestions['en'];
            return langDict[condition] || langDict["default"];
        }

        function getLocale(lang) {
            return { en: 'en-ZA', zu: 'zu-ZA', af: 'af-ZA', nso: 'nso-ZA' }[lang] || 'en-ZA';
        }

        function getWeatherCondition(code, lang) {
            const conditions = {
                en: { clear: "Clear", mostlyClear: "Mostly clear", partlyCloudy: "Partly cloudy", overcast: "Overcast", fog: "Fog", drizzle: "Drizzle", rain: "Rain", snow: "Snow", showers: "Rain showers", snowShowers: "Snow showers", storm: "Thunderstorm" },
                zu: { clear: "Kucacile", mostlyClear: "Kucacile kakhulu", partlyCloudy: "Kunamafu athile", overcast: "Kuguqubele", fog: "Kunenkungu", drizzle: "Kunethonsi lemvula", rain: "Imvula", snow: "Iqhwa", showers: "Izihlambi zemvula", snowShowers: "Izihlambi zeqhwa", storm: "Ukuduma kwezulu" },
                af: { clear: "Helder", mostlyClear: "Meestal helder", partlyCloudy: "Gedeeltelik bewolk", overcast: "Bewolk", fog: "Mis", drizzle: "Motreën", rain: "Reën", snow: "Sneeu", showers: "Reënbuie", snowShowers: "Sneeubuie", storm: "Donderstorm" },
                nso: { clear: "Boso bjo bo hlakilego", mostlyClear: "Boso bjo bo hlakilego kudu", partlyCloudy: "Maru a se makae", overcast: "Maru a mantši", fog: "Mouwane", drizzle: "Pula ya go rotha", rain: "Pula", snow: "Lehlwa", showers: "Dipula tša go tšhologa", snowShowers: "Dipula tša lehlwa", storm: "Ledimo la pula" }
            };
            const labels = conditions[lang] || conditions.en;
            if (code === 0) return labels.clear;
            if (code === 1) return labels.mostlyClear;
            if (code === 2) return labels.partlyCloudy;
            if (code === 3) return labels.overcast;
            if (code === 45 || code === 48) return labels.fog;
            if (code >= 51 && code <= 55) return labels.drizzle;
            if (code >= 56 && code <= 67) return labels.rain;
            if (code >= 71 && code <= 77) return labels.snow;
            if (code >= 80 && code <= 82) return labels.showers;
            if (code >= 85 && code <= 86) return labels.snowShowers;
            if (code >= 95) return labels.storm;
            return labels.overcast;
        }

        function getRainChanceLabel(lang) {
            return { en: "rain", zu: "imvula", af: "reën", nso: "pula" }[lang] || "rain";
        }

        function getLocalDateParts(localTime) {
            const match = /^(\d{4})-(\d{2})-\d{2}T(\d{2}):/.exec(localTime || '');
            if (!match) throw new Error("Local forecast time is unavailable");
            return { month: Number(match[2]), hour: Number(match[3]) };
        }

        function getSeasonalAdvice(localTime, lang) {
            const { month } = getLocalDateParts(localTime);
            let season = "summer";
            if (month >= 3 && month <= 5) season = "autumn";
            else if (month >= 6 && month <= 8) season = "winter";
            else if (month >= 9 && month <= 11) season = "spring";

            const langDict = seasonalSuggestions[lang] || seasonalSuggestions.en;
            return langDict[season];
        }

        function getTimeAdvice(localTime, lang) {
            const { hour } = getLocalDateParts(localTime);
            let timeOfDay = "night";
            if (hour >= 5 && hour <= 9) timeOfDay = "morning";
            else if (hour >= 10 && hour <= 15) timeOfDay = "midday";
            else if (hour >= 16 && hour <= 19) timeOfDay = "evening";

            const langDict = timeSuggestions[lang] || timeSuggestions.en;
            return langDict[timeOfDay];
        }

        function continueConversation() {
            setTimeout(() => {
                state = 5;
                session.service = '';
                session.location = '';
                const dict = prompts[session.lang] || prompts.en;
                addMessage(dict.askMore, 'bot');
            }, 800);
        }

        function addMessage(content, sender) {
            const isUser = sender === 'user';
            const wrapper = document.createElement('div');
            wrapper.className = `flex ${isUser ? 'justify-end' : 'justify-start'} w-full message-pop`;

            const bubble = document.createElement('div');
            
            if (isUser) {
                bubble.className = "message-bubble bg-[#d9fdd3] text-slate-800 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%] shadow-sm text-[15px] leading-relaxed relative";
                bubble.textContent = content; // Prevent XSS
                
                const tail = document.createElement('div');
                tail.className = "absolute top-0 -right-2 w-3 h-4 bg-[#d9fdd3]";
                tail.style.clipPath = "polygon(0 0, 0 100%, 100% 0)";
                bubble.appendChild(tail);
            } else {
                bubble.className = "message-bubble bg-white text-slate-800 border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] shadow-sm text-[15px] leading-relaxed relative";
                bubble.innerHTML = content; 
                
                const tail = document.createElement('div');
                tail.className = "absolute top-0 -left-2 w-3 h-4 bg-white border-t border-l border-slate-100";
                tail.style.clipPath = "polygon(100% 0, 0 0, 100% 100%)";
                bubble.appendChild(tail);
            }

            const timeSpan = document.createElement('span');
            timeSpan.className = "block text-right text-[10px] text-slate-500 mt-2 leading-none";
            timeSpan.innerText = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            if (isUser) timeSpan.innerHTML += ' <i class="fa-solid fa-check-double text-[#53bdeb] ml-1"></i>';
            
            bubble.appendChild(timeSpan);
            wrapper.appendChild(bubble);
            chatContainer.appendChild(wrapper);
            chatContainer.appendChild(typingIndicator); // Keep indicator at bottom
            
            scrollToBottom();
        }

        function showTyping() {
            typingIndicator.classList.remove('hidden');
            scrollToBottom();
        }

        function hideTyping() {
            typingIndicator.classList.add('hidden');
        }

        function scrollToBottom() {
            setTimeout(() => chatContainer.scrollTop = chatContainer.scrollHeight, 10);
        }
