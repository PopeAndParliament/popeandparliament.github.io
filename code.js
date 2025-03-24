let historicIndex = [0, 1, 3, 5, 8, 11, 15, 17, 20, 22, 25];
currentEvent = 0;

Money = 200;
Prestige = 10;
Legitimacy = 70;
MilitaryStrength = 40;
Nobles = 6;
Merchants = 5;
Clergy = 5;
Commoners = 3;

Florence = 4;
Milan = 2;
Venice = 3;
PapalState = 2;

moods = ["Rebelious", "Angry", "Discontented", "Sceptical", "Neutral", "Cooperative", "Happy", "Supportive", "Loyal"];
relations = ["Antagonistic", "Angered", "Strained", "Neutral", "Pleasant", "Cordial", "Allied"];

effects = [
    [], ["Money -= 150;", "Prestige += 12"], ["Money += 100", "Nobles -= 3", "Merchants += 2", "Clergy -= 1", "Commoners -= 1"], ["Merchants -= 1"], ["Money -= 40", "Milan += 2", "Nobles += 1", "Prestige += 5"], ["Nobles -= 1"]
];

PressBought = false
DaVinciAccepted = false
DaVinciRefused = false
SpainAllaiance = false

historicEvents = [
    {
        "title": "A City in Your Hands",
        "date": "1400",
        "img": "https://mymagicearth.com/wp-content/uploads/2018/07/Lucca-a-City-Encircling-by-Well-preserved-Renaissance-Walls-22-1024x683.jpg",
        "text": "The Republic of Lucca stands at a crossroads. Nestled between powerful neighbors—Florence, Milan, and Venice; our city is a beacon of commerce and independence. But power is fragile, and enemies are many. The council looks to you, the ruler of Lucca, to guide the city through treacherous times.<br> The burdens of leadership are great: the army must be kept strong, the treasury full, and the people content. Nobles, merchants, and clergy all seek influence, while foreign powers scheme to bend Lucca to their will. Every decision you make will shape the fate of the republic. Will you secure prosperity through diplomacy, or through the sword? Will your name be spoken with reverence—or cursed as the one who lost it all? <br> The council awaits your command. Rule wisely, for as long as you can.",
        "options": [
            { "txt": "For Lucca!", "effect": "" }
        ]
    },
    {
        title: "Council of Constance",
        date: "1418",
        img: "",
        text: `After decades of a papal infighting, the Church finally decided it was time to address the Western Schism with the Council of Constance. Naturally, instead of a smooth resolution, it became a grand spectacle of political maneuvering, forced abductions, and moral posturing. The Council managed to remove Antipope John XXIII, condemn his many scandals, and install Pope Martin V as the one true pope. The schism was "officially" over, but given the Church’s track record, no one was holding their breath for the end of papal intrigue. At least they got around to fixing the three-popes problem—eventually.`,
        options: [
            {txt: "Let's restart relations with the new papacy.", effect: "PapalState += 1"},
            {txt: "We want nothing to do with this corrupt institution, confiscate chruch property!", effect: "PapalState -= 4 | Money += 80"},
        ]
    },
    {
        title: "Ascendancy of Cosimo de Medici",
        date: "1434",
        img: "",
        text: `Florence, ever a republic in name and an oligarchy in practice, saw fit to exile Cosimo de’ Medici in 1433, much to the delight of his jealous rivals. Yet, like fools casting out the cook and wondering why the feast has soured, they soon found their city teetering on ruin without his wealth and wisdom. Milan, ever shrewd, lent its aid to Cosimo’s cause, while Venice and the Pope—seeing no profit in a Medici-led Florence—gnashed their teeth in opposition. One year was all it took for the city to come crawling back, and with a display of gracious inevitability, Cosimo returned—not as a prince, nor as a tyrant, but as the master of Florence in all but name.`,
        options: [
            {txt: "Let's start off the relation on the right foot with a little gift.", effect: "Money -= 30 | Florence += 1"},
            {txt: "That upstart, ransacking the Florentine fields will put him in his place!", effect: "MilitaryStrength -= 10 | Money += 40 | Florence -= 2"},
            {txt: "Good for him I suppose?", effect: ""},
        ]
    },
    {
        title: "Invention of the printing press",
        date: "1440",
        img: "",
        text: `A new contraption, a ‘printing press,’ rattles away in a dusty workshop. No longer must scribes toil by candlelight—words now march across pages like an army. Books will no longer be the privilege of the few. What new ideas will take root? And which rulers will fear them?`,
        options: [
            {txt: "We must aquire one of these contraptions, whatever the price.", effect: "Money -= 50 | Prestige += 5 | Commoners += 1 | Clergy += 1 | PressBought = true"},
            {txt: "We have no interest in these gimicks. We will write by hand like God intended.", effect: "Prestige -= 2"},
        ]
    },
    {
        title: "Fall of Constantinople",
        date: "1453",
        img: "",
        text: `Christendom is under siege. The seat of the orthodox church and eastern Roman Empire has been conquered by invading heretics. Our allegiance here is clear, we must do all we can to aid the suffering Christians. The question remains of how we can accomplish this. Like many other Italian city states, we could give refuge to Christian Greek academics. But with more effort, we could send some of our men to defend the last remnants of the Eastern Romans. Christendom would thank us for bearing this cross.`,
        options: [
            {txt: "Adopt christian exiles.", effect: "Money -= 50 | Prestige += 3 | Legitimacy += 5"},
            {txt: "Muster our strength to defend christendom!", effect: "MilitaryStrength -= 25 | Prestige += 15 | Legitimacy += 7"},
        ]
    },
    {
        title: "Assassination of Galeazzo Maria Sforza",
        date: "1476",
        img: "",
        text: `The Duke is dead, but Milan does not rejoice. Power shifts from one Sforza to another, and the iron grip of Lodovico ‘Il Moro’ tightens around the city. The assassins dreamed of freedom—what they delivered was a throne to a far more dangerous man.`,
        options: [
            {txt: "Give refuge to the assasins.", effect: "MilitaryStrength += 15 | Prestige -= 5 | Milan -= 2"},
            {txt: "Now this is a ruler we can work with!", effect: "Milan += 1"},
        ]
    },
    {
        title: "The Pazzi Conspiracy",
        date: "1478",
        img: "",
        text: `Blood on the altar. The bells of Florence ring out, not for prayer, but for vengeance. Lorenzo de’ Medici lives—his brother does not. The Pazzi name is cursed, their line erased from the city’s memory. A bloody business, that. Giuliano... gone. And Lorenzo, barely escaped. The streets whisper: the snake struck, but the lion still stands. `,
        options: [
            {txt: "Grant asylum to the Pazzi.", effect: "MilitaryStrength += 25 | Prestige -= 10 | Legitimacy -= 5 | Florence -= 2"},
            {txt: "Deliver condolences to Lorenzo.", effect: "Florence += 1"},
        ]
    },
    {
        title: "War of Ferrara",
        date: "1482",
        img: "",
        text: `The banners of Venice darken the Po Valley, their armies marching to claim Ferrara. Pope Sixtus IV, ever the schemer, blesses the invasion—not for faith, but for family. His nephew, Girolamo Riario, thirsts for land, and the Papacy bends to his ambition. Yet alliances in Italy are as fleeting as a summer storm. No sooner does the Pope call for war than he abandons it, turning against the very Venetians he once embraced.`,
        options: [
            {txt: "The Venetians are a threat to italian security!", effect: "MilitaryStrength -= 15 | Prestige += 5 | PapalState += 2 | Venice -= 4"},
            {txt: "The pope is a corrupt tyrant!", effect: "MilitaryStrength -= 15 | Prestige += 5 | PapalState -= 4 | Venice += 2"},
            {txt: "We don't want anything to do with this travesty.", effect: ""},
        ]
    },
    {
        title: "Italian Wars",
        date: "1494",
        img: "",
        text: `The French banners fly over Italy, and the ground trembles beneath their cavalry. Naples falls, Florence cowers, and Rome watches in dread. Italy is no longer ruled by Italians—foreign swords carve a new future. Soon you too are under threat by the Valois King. How will you defend your city’s sovereignty?`,
        options: [
            {txt: "Through our own might we will defend Lucca!", effect: "MilitaryStrength -= 40 | Prestige += 15 | Legitimacy += 20"},
            {txt: "By pledging allegiance to the realm of the Borgia we will attain safety.", effect: "Legitimacy -= 50 | Prestige -= 5"},
            {txt: "With great expense we can bribe the Holy Roman Emporer into restoring balance to the region.", effect: "Money -= 170 | MilitaryStrength += 10"},
            {txt: "By nature of our prestigious and cultural strength in Italy we will rally the italian states by our side through a cry for help.", effect: "Prestige -= 20 | PapalState += 3 | Florence += 3 | Milan += 3 | Venice += 3"},
        ]
    },
    {
        title: "Rise of the Savonarola",
        date: "1494",
        img: "",
        text: `The bells of Florence toll, not for victory, but for repentance. Jewels, silks, and paintings—fuel for the flames. The voice of Savonarola thunders through the streets: cast off your vanity, or burn with it! The people listen… for now.`,
        options: [
            {txt: "We will join our Florentine brothers in correcting the sins of the past.", effect: "Prestige -= 7 | Clergy += 2"},
            {txt: "These maniacs seek to destroy our culture!", effect: "Clergy -= 1"},
        ]
    },
    {
        title: "Turn of the century",
        date: "1500",
        img: "https://www.worldhistory.org/uploads/images/13841.jpg",
        text: `Florence has burned, Milan has bled, Naples has bowed, and Rome has been bought and sold a dozen times over. But here, within your walls, the people still whisper your name with reverence—or perhaps with fear. You have outlived the assassins, outlasted the mercenaries, and outwitted the princes who thought you weak. Against all odds, your city-state stands unbroken.`,
        options: []
    }
];

genericEvents = [
    {
        title: "Leonardo da Vinci visits Lucca",
        date: "",
        img: "https://uploads0.wikiart.org/00323/images/leonardo-da-vinci/pic7.png!Large.png",
        text: "The visit of the up-and-coming artist and polymath Leonardo da Vinci could spell fortunes for our city state. A virtuoso of the arts and sciences, da Vinci may be a blessing to the academics and creatives of the city. More importantly, however, his talents could be used to garner prestige and fame for Lucca. Who could resist instrumentalising such a great mind for political gain, although it would be costly.",
        options: [
            {txt: "Finance da Vinci", effect: "Money -= 100 | Prestige += 15 | DaVinciAccepted = true"},
            {txt: "Turn da Vinci down", effect: "DaVinciRefused = false"},
        ],
        prerequisite: "",
        seen: false,
        "pressing": false
    },
    {
        title: "Taxes & Tariffs",
        date: "",
        img: "",
        text: "Our times are those of change, nowhere else is this as apparent as in the transfer of power from the aristocracy to the merchant class. These merchants, already presenting a threat to the old order, now seek even more privilege. The taxes and tariffs of our realm hurt our position in the global market, they argue. If we were to grant generous exemptions to the large trading companies, the economy could grow stronger. While this economic philosophy seems dubious at best, the merchants have generously offered to make the deal more suitable with a large donation as gratitude. Is this momentary wealth worth angering the non-mercantile classes of our realm?",
        options: [
            {txt: "Grant the exemptions", effect: "Merchants += 2 | Nobles -= 3 | Commoners -= 1 | Clergy -= 1 | Money += 80"},
            {txt: "Refuse the merchants", effect: "Merchants -= 1 | Nobles += 1"},
        ],
        prerequisite: "",
        seen: false,
        "pressing": false
    },
    {
        title: "Tragic double suicide in Verona",
        date: "",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Romeo_and_juliet_brown.jpg/330px-Romeo_and_juliet_brown.jpg",
        text: "Yersternight, a tragic scene occurred in the calm Venetian city of Verona. The cities families, Capulet and Montague, have made an unlikely set of victims. Two young lovers of the opposing families took their life after a cruel case of miscommunication. Believing each other already dead, they could not bear the fate of life in solitude.",
        options: [
            {txt: "Oh dear!", effect: ""}
        ],
        prerequisite: "",
        seen: false,
        "pressing": false
    },
    {
        title: "A Very Expensive Dowry",
        date: "",
        img: "",
        text: "A noble house seeks to marry their daughter into Milanese aristocracy, and like all great affairs of the heart, it requires an absurd amount of money. They promise this match will secure our alliance with Milan. We may fund this grand romantic gesture, or keep our treasury intact and let love find a cheaper way.",
        options: [
            { "txt": "Pay the dowry—what is money but an obstacle to romance?", "effect": "Money -= 120 | Prestige += 10 | Milan += 3 | Legitimacy += 10" },
            { "txt": "Decline—let them elope like sensible paupers", "effect": "Prestige -= 2 | Milan -= 1"}
        ],
        prerequisite: "",
        seen: false,
        "pressing": false
    },
    {
        "title": "The Condottieri Switch Sides (As They Do)",
        "date": "",
        "img": "",
        "text": "Our hired mercenary company has suddenly realized that they could be making more money elsewhere. Whether it was Milan, Venice, or just their own growing sense of opportunism, they have abandoned our cause. Do we attempt to outbid their new employer, or pretend this betrayal was entirely expected and definitely not a disaster?",
        "options": [
            { "txt": "Pay them even more; loyalty must be bought.", "effect": "Money -= 90 | MilitaryStrength += 15" },
            { "txt": "Let them go, we never trusted them anyway.", "effect": "MilitaryStrength -= 20" }
        ],
        "prerequisite": "",
        "seen": false,
        "pressing": false
    },
    {
        "title": "A Bastard Claims the Throne",
        "date": "",
        "img": "",
        "text": "A charming yet inconvenient noble has stepped forth, claiming to be the true heir to our city. His parentage is dubious, his supporters overenthusiastic, and his timing truly atrocious. The commoners whisper, the nobles mutter, and the merchants take bets. Do we silence him before this gets out of hand, or humor him with a trial by combat?",
        "options": [
            { "txt": "Send him on a very permanent vacation.", "effect": "Prestige -= 8 | Legitimacy += 10"},
            { "txt": "Challenge him to a duel, honor and all that.", "effect": "Prestige += 8 | Legitimacy -= 10" }
        ],
        "prerequisite": "",
        "seen": false,
        "pressing": false
    },
    {
        "title": "The Pope Questions Our Right to Rule",
        "date": "",
        "img": "",
        "text": "In an astonishing display of self-importance, His Holiness has reconsidered whether we truly deserve to rule. Perhaps it was our lack of tithes, our unrepentant debauchery, or the small matter of our armies looting Papal lands. Regardless, Rome frowns upon us. Shall we beg for forgiveness, or remind the Vatican that they are not the only ones with soldiers?",
        "options": [
            { "txt": "Send gifts and apologies; we need legitimacy.", "effect": "PapalState += 3 | Money -= 50 | Prestige -= 3 | Legitimacy += 5" },
            { "txt": "Threaten them; we rule by steel, not by papal whims.", "effect": "PapalState -= 3 | Clergy -= 2" }
        ],
        "prerequisite": "PapalState <= 2 || Clergy <= 3",
        "seen": false,
        "pressing": true
    },
    {
        "title": "A Rival City Insults Our Honor",
        "date": "",
        "img": "",
        "text": "The envoys from Florence, in their infinite arrogance, have publicly declared our city ‘a provincial backwater ruled by incompetent buffoons.’ We are, of course, deeply offended. The people demand satisfaction, but how shall we extract it? A grand duel? A military campaign? Or shall we simply spread alternative facts about Florence’s hygiene?",
        "options": [
            { "txt": "Declare war, let steel settle the matter.", "effect": "MilitaryStrength -= 30 | Prestige += 20 | Money += 50" },
            { "txt": "Challenge their leader to a duel, honor at stake!", "effect": "Prestige += 5 | Legitimacy += 10" },
            { "txt": "Mock them in return; Florence bathes too much anyway.", "effect": "Florence -= 2" }
        ],
        "prerequisite": "",
        "seen": false,
        "pressing": false
    },
    {
        "title": "A Genius General Offers His Service (At a Price)",
        "date": "",
        "img": "",
        "text": "A famed general, known for his cunning on the battlefield and his even greater cunning in demanding exorbitant wages, offers to lead our armies. His victories are legendary, his fees ruinous. Do we invest in military brilliance, or trust in our own (less expensive) leadership?",
        "options": [
            { "txt": "Hire him, greatness is worth the coin.", "effect": "MilitaryStrength += 15 | Money -= 70" },
            { "txt": "Refuse; surely we know strategy.", "effect": "" }
        ],
        "prerequisite": "",
        "seen": false,
        "pressing": false
    },
    {
        "title": "The Rise of a Rival Mercenary Leader",
        "date": "",
        "img": "",
        "text": "A notorious mercenary captain from a neighboring city has united a large band of outlaws and disbanded soldiers under his banner. The mercenaries are now making threatening moves toward our borders, demanding payment for ‘protection’ or preparing to launch an attack. This rogue leader’s rise threatens both our military strength and our legitimacy. Do we pay for their ‘services,’ or prepare our forces for war?",
        "options": [
            { "txt": "Pay the mercenaries; peace may be costly, but cheaper than war.", "effect": "Money -= 80 | Legitimacy -= 5" },
            { "txt": "Prepare for war; we will not be intimidated by outlaws.", "effect": "MilitaryStrength -= 25 | Legitimacy += 5" },
            { "txt": "Attempt to hire the mercenaries ourselves; perhaps we can turn this to our advantage.", "effect": "Money -= 170 | MilitaryStrength += 25 | Legitimacy += 10" }
        ],
        "prerequisite": "",
        "seen": false,
        "pressing": false
    },
    {
        "title": "The Papal Curse",
        "date": "",
        "img": "",
        "text": "In an unprecedented move, the Pope has issued a papal bull excommunicating our city and its rulers. His reasons remain vague—some claim it's due to our lack of proper fealty, others whisper about our refusal to support certain papal candidates. Regardless, the excommunication has caused unrest among the clergy and made our legitimacy and foreign relations falter. Will we attempt to negotiate with the Pope, or will we seek a different path?",
        "options": [
            { "txt": "Appeal to the Pope; perhaps this can be undone with the right offering.", "effect": "Money -= 200 | PapalState += 4" },
            { "txt": "Defy the Pope; our legitimacy does not depend on his blessing.", "effect": "Prestige -= 10 | Legitimacy -= 40 | Clergy -= 3" },
            { "txt": "Attempt to find support from other religious leaders; surely not all are aligned with Rome.", "effect": "Prestige -= 15 | Legitimacy -= 10 | Clergy -= 5" }
        ],
        "prerequisite": "PapalState == 0",
        "seen": false,
        "pressing": true
    },
    {
        "title": "A Plague Sweeps Through the City",
        "date": "",
        "img": "",
        "text": "A deadly plague has begun to ravage the city, and no one is certain where it originated. It strikes at random, leaving both nobles and commoners vulnerable. The merchant class is in a panic, and food supplies are dwindling. The crisis has led to widespread discontent, affecting our money and military. Do we focus on isolating the city to contain the disease, or attempt to restore order in the face of chaos?",
        "options": [
            { "txt": "Quarantine the city; we cannot risk the plague spreading further.", "effect": "Merchants -= 2 | Commoners -= 2 | Money -= 50" },
            { "txt": "Attempt to rebuild the economy and morale; the city must survive, plague or not.", "effect": "Money += 20 | Merchants += 1 | Commoners -= 4" },
            { "txt": "Reach out to foreign allies for aid; perhaps a cure can be found in Venice or Florence.", "effect": "Prestige -= 15 | Florence += 1 | Venice += 1 | Merchants += 2 | Commoners += 2" }
        ],
        "prerequisite": "",
        "seen": false,
        "pressing": false
    },
    {
        "title": "Rebellion in the Countryside",
        "date": "",
        "img": "",
        "text": "A sudden rebellion has broken out in the countryside, led by disgruntled peasants who are tired of oppressive taxes and harsh conditions. The rebellion is gaining momentum, and our military strength is being tested. If we suppress the rebellion too harshly, we risk alienating the commoners; if we are too lenient, the rebellion may spread to the cities. Do we take a firm stance or seek a peaceful resolution?",
        "options": [
            { "txt": "Crush the rebellion swiftly; we cannot let disorder reign.", "effect": "MilitaryStrength -= 25 | Legitimacy -= 30 | Prestige -= 15" },
            { "txt": "Offer concessions; perhaps a peaceful resolution will prevent further unrest.", "effect": "Money -= 100 | Prestige -= 5 | Commoners += 3" },
        ],
        "prerequisite": "Commoners <= 1",
        "seen": false,
        "pressing": true
    },
    {
        "title": "The Arrival of a Foreign Diplomat from Spain",
        "date": "",
        "img": "",
        "text": "A foreign diplomat from the Spanish crown arrives, offering an alliance against the rising power of Milan. The diplomat promises military support and wealth, but the cost is a public endorsement of Spain’s expanding influence in Italy. The relationship with other Italian states would surely sour, but the potential benefits may outweigh the risks. Do we align ourselves with Spain, or remain neutral in this growing conflict?",
        "options": [
            { "txt": "Align with Spain; their power is undeniable, and we need military strength.", "effect": "MilitaryStrength += 15 | Money += 50 | Legitimacy -= 5 | Milan -= 3 | Venice -= 2 | Florence -= 2 | PapalState -= 1 | SpainAllaiance = true" },
            { "txt": "Remain neutral; let Milan and Spain clash without our involvement.", "effect": "" },
        ],
        "prerequisite": "",
        "seen": false,
        "pressing": false
    },
    {
        "title": "Venetian Diplomats Offer a Trade Pact",
        "date": "",
        "img": "",
        "text": "Venetian diplomats have arrived, offering a lucrative trade pact that could open up our markets to their vast naval empire. Of course, they expect favors in return, perhaps a small garrison in our port or some influence over our politics. Do we accept their offer, or politely decline, hoping that Venice's fleet will not turn its cannons in our direction?",
        "options": [
            { "txt": "Accept their offer; trade is the lifeblood of prosperity.", "effect": "Money += 100 | Legitimacy -= 20 | Venice += 2" },
            { "txt": "Decline politely; we don’t need Venetian strings attached.", "effect": ""},
            { "txt": "Accept with conditions; we will remain the masters of our port.", "effect": "Money += 30 | Venice += 1" }
        ],
        "prerequisite": "",
        "seen": false,
        "pressing": false
    },
    {
        "title": "Milanese Intrigue in Our Courts",
        "date": "",
        "img": "",
        "text": "The Duke of Milan, ever the schemer, has sent a courtier to our court under the guise of diplomatic relations. The man is charming, but rumors swirl about his true intentions—he could be seeking to manipulate our politics for Milan’s benefit. Do we welcome him as a guest, or expose his motives before he can entangle us?",
        "options": [
            { "txt": "Welcome him warmly; diplomacy can be a tricky game.", "effect": "Milan += 2 | Nobles += 1 | Merchants -= 2" },
            { "txt": "Expose him immediately; Milan’s tricks won’t fool us.", "effect": "Milan -= 2 | Prestige += 5" },
            { "txt": "Send him packing; no Milanese influence here.", "effect": "Milan -= 2 | Legitimacy += 15" }
        ],
        "prerequisite": "",
        "seen": false,
        "pressing": false
    },
    {
        "title": "The Papacy Seeks Our Support in an Election",
        "date": "",
        "img": "",
        "text": "The Pope, in his infinite wisdom, has called upon us to support his candidate in the upcoming papal election. It would surely solidify our position with the Church, but there are rivals who could stand in the way. Do we offer our backing in exchange for favors, or stay neutral and avoid angering anyone in Rome?",
        "options": [
            { "txt": "Support the Pope’s candidate; favor with the Church is priceless.", "effect": "PapalState += 2 | Clergy += 1"},
            { "txt": "Stay neutral; the Church has enough sway already.", "effect": "" },
            { "txt": "Support a rival candidate; perhaps we can flip the situation in our favor.", "effect": "PapalState -= 2 | Clergy -= 1 | Money += 60" }
        ],
        "prerequisite": "",
        "seen": false,
        "pressing": false
    },
    {
        "title": "Naples Demands Tribute",
        "date": "",
        "img": "",
        "text": "Naples, with their ever-expanding borders, demands tribute from us in exchange for peace. The sum is staggering, but their army is fearsome. Do we pay them off to keep the peace, or prepare to fight for our independence?",
        "options": [
            { "txt": "Pay the tribute; a peaceful city is a prosperous city.", "effect": "Money -= 80" },
            { "txt": "Refuse and prepare to fight; our independence is worth the cost.", "effect": "MilitaryStrength -= 20" },
        ],
        "prerequisite": "",
        "seen": false,
        "pressing": false
    },
    {
        "title": "A Merchant Fleet From Genoa Arrives",
        "date": "",
        "img": "",
        "text": "A fleet from Genoa, known for their mercantile prowess, arrives in our harbor, offering goods from the East. They promise wealth beyond imagining, but only if we enter into an exclusive agreement. Other cities are no doubt eager to get their hands on these treasures. Do we agree to Genoa’s terms, or strike out on our own for a better deal?",
        "options": [
            { "txt": "Agree to their terms; wealth can buy a thousand problems.", "effect": "Money += 150 | Legitimacy -= 20 | Merchants += 2" },
            { "txt": "Refuse; the terms seem too restrictive.", "effect": ""},
        ],
        "prerequisite": "",
        "seen": false,
        "pressing": false
    },
    {
        "title": "A Papal Bull Announces Excommunication of a Neighbor",
        "date": "",
        "img": "",
        "text": "A papal bull has just been issued, excommunicating the neighboring city of Perugia for their sinful ways. The Pope’s decree puts us in a delicate position—if we align with Rome, we risk angering our neighbors. If we stay neutral, we risk alienating the Church. Do we endorse the excommunication, or stay silent and let the matter blow over?",
        "options": [
            { "txt": "Endorse the excommunication; it’s a sign of the Pope’s power.", "effect": "PapalState += 2" },
            { "txt": "Remain neutral; let Perugia and Rome deal with their own matters.", "effect": "" },
            { "txt": "Speak out in support of Perugia; the Church can’t rule over everything.", "effect": "Prestige += 10 | PapalState -= 2" }
        ],
        "prerequisite": "",
        "seen": false,
        "pressing": false
    },
    {
        "title": "The Nobles Revolt",
        "date": "",
        "img": "",
        "text": "The nobles, once loyal supporters of our reign, have grown disillusioned with our leadership. They claim our rule is weak, taxes too high, and we are no longer the patron of their lavish tastes. In response, a faction of powerful noble families has risen up, openly declaring their independence. They march on our capital, demanding reforms or else they will seize control of the city. The military is split. If we cannot regain their favor, this rebellion could tear the city apart.",
        "options": [
            { "txt": "Negotiate with the nobles; they will demand more privileges, but perhaps peace can be brokered.", "effect": "Nobles += 3 | Clergy -= 2 | Commoners -= 2 | Merchants -= 2" },
            { "txt": "Crush the rebellion; their discontent is nothing more than treason.", "effect": "MilitaryStrength -= 20 | Legitimacy -= 10"},
            { "txt": "Concede to their demands; the nobles may rule over us, but we can still maintain some power.", "effect": "Legitimacy -= 30 | Prestige -= 10" }
        ],
        "prerequisite": "Nobles == 0",
        "seen": false,
        "pressing": true
    },
    {
        "title": "The Clergy's Excommunication",
        "date": "",
        "img": "",
        "text": "The clergy, once our allies in maintaining legitimacy, has grown increasingly hostile towards our rule. They accuse us of failing to protect the Church's interests and have called for a public excommunication. Without the Church’s blessing, our legitimacy crumbles, and the people turn their faith elsewhere. Religious riots break out, and the city’s stability is at risk. Will we try to appease the clergy, or openly defy the Church's authority?",
        "options": [
            { "txt": "Appease the clergy; they may be the only way to regain legitimacy and calm the rioters.", "effect": "Money -= 80 | Clergy += 3" },
            { "txt": "Defy the Church; we will rule by our own laws, not by papal decree.", "effect": "Legitimacy -= 10 | Prestige -= 15" },
            { "txt": "Seek support from rival religious factions; there are other ways to gain the people’s loyalty.", "effect": "Legitimacy -= 30" }
        ],
        "prerequisite": "Clergy == 0",
        "seen": false,
        "pressing": true
    },
    {
        "title": "The Merchant’s Uprising",
        "date": "",
        "img": "",
        "text": "Our relationship with the merchant class has soured dramatically. The taxes we’ve imposed have crippled their businesses, and the merchants, once a backbone of our economy, have turned against us. A group of wealthy merchants has begun funding a secret uprising, rallying the commoners against our rule. Their organized protests have turned into open revolt. If we do not find a way to appease them, this revolt will collapse the city’s trade and our wealth.",
        "options": [
            { "txt": "Increase the merchants’ privileges; they can stabilize the economy if they are satisfied.", "effect": "Merchants += 3 | Clergy -= 2 | Nobles -= 2 | Commoners -= 2" },
            { "txt": "Suppress the revolt; we cannot allow the merchants to dictate our policies.", "effect": "MilitaryStrength -= 20" },
            { "txt": "Confiscate their assets; they will pay for their betrayal.", "effect": "Money += 150 | Legitimacy -= 40" }
        ],
        "prerequisite": "Merchants <= 1",
        "seen": false,
        "pressing": true
    },
    {
        "title": "Venetian Invasion",
        "date": "",
        "img": "",
        "text": "Venice, once a diplomatic ally, has turned against us. Their ruler claims our city has betrayed them, citing numerous slights, real or imagined, over the past few years. Venice has assembled its navy and army, preparing to invade. If we cannot form a new alliance or strengthen our military, our city is at risk of being absorbed by this powerful neighbor. Can we negotiate peace, or will we be forced into a bloody conflict?",
        "options": [
            { "txt": "Negotiate with Venice; we need their favor to avoid war.", "effect": "Prestige -= 15 | Money -= 120" },
            { "txt": "Prepare for war; we will not surrender to Venetian rule.", "effect": "MilitaryStrength -= 35" },
            { "txt": "Seek aid from other Italian states; maybe Milan or Florence will come to our aid.", "effect": 67 }
        ],
        "prerequisite": "Venice <= 1",
        "seen": false,
        "pressing": true
    },
    {
        "title": "Milan’s Ultimatum",
        "date": "",
        "img": "",
        "text": "Milan, frustrated by our recent actions, has issued an ultimatum. They demand that we cede territory and submit to their authority, or face immediate military intervention. They accuse us of meddling in their internal affairs, and their military forces are already on the move. Should we concede to Milan’s demands, risk an all-out war, or seek a peaceful resolution?",
        "options": [
            { "txt": "Concede to Milan’s demands; diplomacy can save us from war.", "effect": "Prestige -= 15 | Legitimacy -= 50"},
            { "txt": "Refuse their ultimatum; let Milan come, we shall defend our territory.", "effect": "MilitaryStrength -= 35" },
        ],
        "prerequisite": "Milan <= 1",
        "seen": false,
        "pressing": true
    },
    {
        "title": "Da Vinci invents an armoured car",
        "date": "",
        "img": "https://www.historyhit.com/app/uploads/2022/04/Leonardos-Tank.jpg",
        "text": "The famed polymath Leonardo da Vinci whom we have recently recruited into our ranks is already paying his due by increasing our army prowess by the advent of an armoured car.",
        "options": [
            { "txt": "What a beautiful mind!", "effect": "Prestige += 5 | MilitaryStrength += 20"},
        ],
        "prerequisite": "DaVinciAccepted == true",
        "seen": false,
        "pressing": false
    },
    {
        "title": "Da Vinci mproves our clocks",
        "date": "",
        "img": "",
        "text": "The famed polymath Leonardo da Vinci whom we have recently recruited into our ranks is already paying his due by improving our clocks, thereby improving the efficiency of our merchants.",
        "options": [
            { "txt": "What a beautiful mind!", "effect": "Prestige += 5 | Merchants += 1 | Money += 30"},
        ],
        "prerequisite": "DaVinciAccepted == true",
        "seen": false,
        "pressing": false
    },
    {
        "title": "The Genius We Turned Away",
        "date": "",
        "img": "",
        "text": "Leonardo da Vinci, disappointed by our lack of support, has left Lucca for Florence, where he has found eager patrons. Scholars lament our missed opportunity, and the city gains a reputation for being closed to innovation. Some say that future thinkers will seek more welcoming lands to develop their ideas.",
        "options": [
            { "txt": "What a shame!", "effect": "Prestige -= 5"},
        ],
        "prerequisite": "DaVinciRefused == true",
        "seen": false,
        "pressing": false
    },
    {
        "title": "Spanish aid arrives",
        "date": "",
        "img": "",
        "text": "Due to our alliance, the Spanish have sent forces to reinvigorate our ailing military. Some detractors would argue that they are trying to further undermine our legitimacy. But who needs independence when you can murder your enemies?",
        "options": [
            { "txt": "Invite these friends into the realm!", "effect": "MilitaryStrength += 40 | Legitimacy -= 10"},
        ],
        "prerequisite": "SpainAllaiance == true && MilitaryStrength <= 15",
        "seen": false,
        "pressing": true
    },
    {
        "title": "The boons of the printing press",
        "date": "",
        "img": "",
        "text": "Our purchase of the printing press has not been in vain! Reading is more affordable than ever, and literacy among the peasants is on the rise. This has also attracted great political minds such as Petrarch, Machiavelli, and Ariosto. Clearly, this development has benefited all social strata and the image of our state greatly.",
        "options": [
            { "txt": "Eureka!", "effect": "Prestige += 10 | Commoners += 2 | Clergy += 2 | Nobles += 1 | Merchants += 1"},
        ],
        "prerequisite": "PressBought == true",
        "seen": false,
        "pressing": false
    }
]

function renderEvent(event){
    event.seen = true;
    if(event.date != ""){
        document.getElementById("datep").innerHTML = `The year of our lord - ${event.date}.`;
    }
    else{
        document.getElementById("datep").innerHTML = ``;
    }

    document.getElementById("gold").innerHTML = Money;
    document.getElementById("prestige").innerHTML = Prestige;
    document.getElementById("legitimacy").innerHTML = `${Legitimacy}%`;
    document.getElementById("mil").innerHTML = MilitaryStrength;

    document.getElementById("noblesMd").innerHTML = `${moods[Nobles]}`;
    document.getElementById("merchantsMd").innerHTML = `${moods[Merchants]}`;
    document.getElementById("clergyMd").innerHTML = `${moods[Clergy]}`;
    document.getElementById("commonersMd").innerHTML = `${moods[Commoners]}`;

    document.getElementById("Florence").innerHTML = `${relations[Florence]}`;
    document.getElementById("Milan").innerHTML = `${relations[Milan]}`;
    document.getElementById("Venice").innerHTML = `${relations[Venice]}`;
    document.getElementById("PapalStates").innerHTML = `${relations[PapalState]}`;


    document.getElementById("event-title").innerHTML = event.title;
    if (event.img == ""){
        document.getElementById("eventImage").style.display = "none";
    }
    else{
        document.getElementById("eventImage").style.display = "";
        document.getElementById("eventImage").src = event.img;
    }
    document.getElementById("event-text").innerHTML = event.text;

    container = document.getElementById("event-container");
    for (let i = 0; i < event.options.length; i++) {
        tooltext = "";
        splitEffect = event.options[i].effect.split("|");
        for (let j = 0; j < splitEffect.length; j++) {
            if(splitEffect[j].includes("Money")){
                tooltext += "This will impact our wealth<br><br>";
            }
            if(splitEffect[j].includes("Prestige")){
                tooltext += "This will impact our prestige<br><br>";
            }
            if(splitEffect[j].includes("Legitimacy")){
                tooltext += "This will impact our legitimacy<br><br>";
            }
            if(splitEffect[j].includes("MilitaryStrength")){
                tooltext += "This will impact our military<br><br>";
            }

            if(splitEffect[j].includes("Nobles")){
                tooltext += "This will impact our nobles<br><br>";
            }
            if(splitEffect[j].includes("Merchants")){
                tooltext += "This will impact our merchants<br><br>";
            }
            if(splitEffect[j].includes("Clergy")){
                tooltext += "This will impact our clergy<br><br>";
            }
            if(splitEffect[j].includes("Commoners")){
                tooltext += "This will impact our commoners<br><br>";
            }

            if(splitEffect[j].includes("Florence")){
                tooltext += "This will impact our relation with Florence<br><br>";
            }
            if(splitEffect[j].includes("Milan")){
                tooltext += "This will impact our realtion with Milan<br><br>";
            }
            if(splitEffect[j].includes("Venice")){
                tooltext += "This will impact our relation with Venice<br><br>";
            }
            if(splitEffect[j].includes("PapalState")){
                tooltext += "This will impact our relation with the papacy<br><br>";
            }
            
        }
        if (tooltext == ""){
            tooltext = "This will not impact anything."
        }
        container.innerHTML += `<button id='choice' class='choice-btn' onclick='chooseOption("${event.options[i].effect}")'>${event.options[i].txt}<span class="tooltiptext">${tooltext}</span></button>`;
    }
}

miscEvents = [
    {
        title: "The lord and the beggar.",
        date: "",
        img: "https://images.metmuseum.org/CRDImages/ep/original/DP-25225-001.jpg",
        text: `The bankers of the Medici will no longer extend their courtesy, nor their coin. Without gold, your palace grows cold, your allies distant. What is a ruler without wealth? A poet with no ink.`,
        options: []
    },
    {
        title: "The lord and the liege.",
        date: "",
        img: "https://www.historytoday.com/sites/default/files/2024-03/bonfire_of_the_vanities_history_today.jpg",
        text: `Once, the halls whispered your name with reverence. Now, they mutter it with amusement. The courts of Italy are fickle, and your glory has faded like an old fresco left to time.`,
        options: []
    },
    {
        title: "The lord and the sovereign.",
        date: "",
        img: "https://m.museivaticani.va/content/dam/museivaticani/immagini/collezioni/musei/stanze_raffaello/02_04_Cacciata_Eliodoro_Dettaglio/jcr:content/renditions/original.jpg",
        text: `A prince rules by right, by favor, or by force. You have lost the first, squandered the second, and lack the third. What remains but a pitiful solitude?`,
        options: []
    },
    {
        title: "The lord and the conquerer.",
        date: "",
        img: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Velazquez-The_Surrender_of_Breda.jpg",
        text: `The condottieri count their pay, find it lacking, and march away. Your walls stand tall, but your city is hollow—defended by ghosts and promises.`,
        options: []
    }
]

function chooseOption(choice){
    for (let i = 0; i < choice.split("|").length; i++) {
        eval(choice.split("|")[i]);
    }
    
    if(Nobles < 0){
        Nobles = 0;
    }
    if(Nobles > 8){
        Nobles = 8;
    }
    if(Merchants < 0){
        Merchants = 0;
    }
    if(Merchants > 8){
        Merchants = 8;
    }
    if(Clergy < 0){
        Clergy = 0;
    }
    if(Clergy > 8){
        Clergy = 8;
    }
    if(Commoners < 0){
        Commoners = 0;
    }
    if(Commoners > 8){
        Commoners = 8;
    }

    if(Florence < 0){
        Florence = 0;
    }
    if(Florence > 6){
        Florence = 6;
    }
    if(Milan < 0){
        Milan = 0;
    }
    if(Milan > 6){
        Milan = 6;
    }
    if(Venice < 0){
        Venice = 0;
    }
    if(Venice > 6){
        Venice = 6;
    }
    if(PapalState < 0){
        PapalState = 0;
    }
    if(PapalState > 6){
        PapalState = 6;
    }

    if (Legitimacy > 100){
        Legitimacy = 100;
    }
    
    ch = document.querySelectorAll('[id=choice]');
    for (let i = 0; i < ch.length; i++) {
        ch[i].remove();
    }
    currentEvent += 1;

    if(Money <= 0){
        renderEvent(miscEvents[0]);
    }
    else if(Prestige <= 0){
        renderEvent(miscEvents[1]);
    }
    else if(Legitimacy <= 0){
        renderEvent(miscEvents[2]);
    }
    else if(MilitaryStrength <= 0){
        renderEvent(miscEvents[3]);
    }

    else if (!historicIndex.includes(currentEvent)){
        pressingList = []
        doableList = []
        for (let i = 0; i < genericEvents.length; i++) {
            if(!genericEvents[i].seen){
                if(genericEvents[i].prerequisite == "" || eval(genericEvents[i].prerequisite) === true){
                    if(genericEvents[i].pressing){
                        pressingList.push(genericEvents[i]);
                    }
                    else{
                        doableList.push(genericEvents[i]);
                    }
                }
            }
            
        }
        if (pressingList.length == 0){
            renderEvent(doableList[Math.floor(Math.random() * doableList.length)]);
        }
        else{
            renderEvent(pressingList[Math.floor(Math.random() * pressingList.length)]);
        }
        
    }
    else{
        for (let i = 0; i < historicIndex.length; i++) {
            if(historicIndex[i] == currentEvent){
                renderEvent(historicEvents[i]);
            }
        }
    }
}

renderEvent(historicEvents[0])