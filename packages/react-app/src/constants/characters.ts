export const DEGEN_BASE_API_URL = 'https://api.nifty-league.com';
export const DEGEN_BASE_IMAGE_URL = 'https://nifty-league.s3.amazonaws.com/degens';
export const DISABLE_RENT_API_URL = 'https://odgwhiwhzb.execute-api.us-east-1.amazonaws.com/prod/rentals/rentable/';

export const TRAIT_INDEXES = {
  0: 'tribe',
  1: 'skinColor',
  2: 'furColor',
  3: 'eyeColor',
  4: 'pupilColor',
  5: 'hair',
  6: 'mouth',
  7: 'beard',
  8: 'top',
  9: 'outerwear',
  10: 'print',
  11: 'bottom',
  12: 'footwear',
  13: 'belt',
  14: 'hat',
  15: 'eyewear',
  16: 'piercing',
  17: 'wrist',
  18: 'hands',
  19: 'neckwear',
  20: 'leftItem',
  21: 'rightItem',
};

export const TRAIT_NAME_MAP = {
  tribe: 'Tribe',
  skinColor: 'Skin Color',
  furColor: 'Fur Color',
  eyeColor: 'Eyes',
  pupilColor: 'Pupil',
  hair: 'Hair',
  mouth: 'Mouth',
  beard: 'Beard',
  top: 'Top',
  outerwear: 'Outerwear',
  print: 'Print',
  bottom: 'Bottom',
  footwear: 'Footwear',
  belt: 'Belt',
  hat: 'Hat',
  eyewear: 'Eyewear',
  piercing: 'Piercing',
  wrist: 'Wrist',
  hands: 'Hands',
  neckwear: 'Neckwear',
  leftItem: 'Left Item',
  rightItem: 'Right Item',
};

export const TRIBES = {
  1: 'Ape',
  2: 'Human',
  3: 'Doge',
  4: 'Frog',
  5: 'Cat',
  6: 'Alien',
};

export const BACKGROUNDS = {
  1: '1x (Common)',
  2: '2x (Rare)',
  3: '4x (Meta)',
  4: '6x (Legendary)',
};

export const SKIN_COLORS = {
  // Ape
  10: 'Single Origin',
  11: 'Toledo',
  12: 'Latin Charm',
  13: 'Baleine Blue',
  14: 'Ornery Tangerine',
  15: 'Nordic',
  16: 'Seance',
  17: 'White',
  18: 'Sparky Blue',
  19: 'Atmosphere',
  20: 'Primrose Path',
  21: 'River Styx',
  // Human
  22: 'Gentle Doe',
  23: 'Sweet Curry',
  24: 'Iced Tea',
  25: 'Single Origin',
  26: 'Toledo',
  27: 'Primrose Path',
  28: 'Atmosphere',
  // Doge
  29: 'Ripe Pumpkin',
  30: 'Ornery Tangerine',
  31: 'Baleine Blue',
  32: 'Allegiance',
  33: 'Toledo',
  34: 'Latin Charm',
  35: 'Primrose Path',
  36: 'Cherry Soda',
  // Frog
  37: 'Range Land',
  38: 'White',
  39: 'Seance',
  40: 'Baleine Blue',
  41: 'Ripe Pumpkin',
  42: 'Cherry Soda',
  43: 'Allegiance',
  44: 'Sparky Blue',
  45: 'Atmosphere',
  46: 'Begonia',
  47: 'Greenery',
  // Cat
  48: 'Icy Brook',
  49: 'Signal Pink',
  50: 'Ripe Pumpkin',
  51: 'Baleine Blue',
  52: 'Bonne Nuit',
  53: 'Sweet Curry',
  54: 'Greenery',
  55: 'Atmosphere',
  56: 'Primrose Path',
  57: 'White',
  58: 'River Styx',
  // Alien
  59: 'Range Land',
  60: 'White',
  61: 'Seance',
  62: 'Baleine Blue',
  63: 'Ripe Pumpkin',
  64: 'Gentle Doe',
  65: 'Allegiance',
  66: 'Atmosphere',
  67: 'Sparky Blue',
  68: 'Cherry Soda',
  69: 'Begonia',
};
export const FUR_COLORS = {
  // Ape
  70: 'Sweet Curry',
  71: 'Iced Tea',
  72: 'Blueberry Buckle',
  73: 'Allegiance',
  74: 'Gentle Doe',
  75: 'Canary Island',
  76: 'Signal Pink',
  77: 'White',
  78: 'Sparky Blue',
  79: 'Atmosphere',
  80: 'Primrose Path',
  81: 'Icy Brook',
  // Human
  // Doge
  82: 'White',
  83: 'Canary Island',
  84: 'Icy Brook',
  85: 'Blueberry Buckle',
  86: 'Sweet Curry',
  87: 'Bonne Nuit',
  88: 'Allegiance',
  89: 'Latin Charm',
  // Frog
  // Cat
  90: 'White',
  91: 'Bonne Nuit',
  92: 'Toledo',
  93: 'Ripe Pumpkin',
  94: 'Ornery Tangerine',
  95: 'Sweet Curry',
  96: 'Gentle Doe',
  97: 'Allegiance',
  98: 'Icy Brook',
  99: 'Primrose Path',
  100: 'Sparky Blue',
  // Alien
};
export const EYE_COLORS = {
  101: 'White',
  102: 'River Styx',
  103: 'Sparky Blue',
  104: 'Atmosphere',
  105: 'Latin Charm',
  106: 'Bonne Nuit',
  107: 'Primrose Path',
  108: 'Cherry Soda',
  109: 'Icy Brook',
};
export const PUPIL_COLORS = {
  110: 'River Styx',
  111: 'Cherry Soda',
  112: 'Japanese Carmine',
  113: 'Atmosphere',
  114: 'Range Land',
  115: 'Bonne Nuit',
  116: 'Sparky Blue',
  117: 'Primrose Path',
  118: 'White',
};
export const HAIR = {
  150: 'Beige Afro',
  151: 'Brown Afro',
  152: 'Black Afro',
  153: 'Gray Afro',
  154: 'Blonde Afro',
  155: 'Purple Afro',
  156: 'Blue Afro',
  157: 'Beige Bangs',
  158: 'Caramel Bangs',
  159: 'Cinnamon Bangs',
  160: 'Brown Bangs',
  161: 'Black Bangs',
  162: 'Gray Bangs',
  163: 'Purple Bangs',
  164: 'Pink Bangs',
  165: 'Blonde Bangs',
  166: 'Beige Bun',
  167: 'Caramel Bun',
  168: 'Cinnamon Bun',
  169: 'Brown Bun',
  170: 'Black Bun',
  171: 'Gray Bun',
  172: 'Blonde Bun',
  173: 'Pink Bun',
  174: 'Beige Buzzcut',
  175: 'Caramel Buzzcut',
  176: 'Cinnamon Buzzcut',
  177: 'Brown Buzzcut',
  178: 'Black Buzzcut',
  179: 'Gray Buzzcut',
  180: 'Purple Buzzcut',
  181: 'Pink Buzzcut',
  182: 'Blonde Buzzcut',
  183: 'Beige Curly',
  184: 'Caramel Curly',
  185: 'Cinnamon Curly',
  186: 'Brown Curly',
  187: 'Black Curly',
  188: 'Gray Curly',
  189: 'Blonde Curly',
  190: 'Beige High Flat Top',
  191: 'Caramel High Flat Top',
  192: 'Cinnamon High Flat Top',
  193: 'Brown High Flat Top',
  194: 'Black High Flat Top',
  195: 'Gray High Flat Top',
  196: 'Blonde High Flat Top',
  197: 'Green Mohawk',
  198: 'Red Mohawk',
  199: 'Blue Mohawk',
  200: 'Blonde Mohawk',
  201: 'Purple Mohawk',
  202: 'Pink Mohawk',
  203: 'Beige Pigtails',
  204: 'Caramel Pigtails',
  205: 'Cinnamon Pigtails',
  206: 'Brown Pigtails',
  207: 'Black Pigtails',
  208: 'Gray Pigtails',
  209: 'Blonde Pigtails',
  210: 'Beige Ponytail',
  211: 'Caramel Ponytail',
  212: 'Cinnamon Ponytail',
  213: 'Brown Ponytail',
  214: 'Black Ponytail',
  215: 'Gray Ponytail',
  216: 'Purple Ponytail',
  217: 'Pink Ponytail',
  218: 'Blonde Ponytail',
  219: 'Beige Pulled-Back',
  220: 'Caramel Pulled-Back',
  221: 'Cinnamon Pulled-Back',
  222: 'Brown Pulled-Back',
  223: 'Black Pulled-Back',
  224: 'Gray Pulled-Back',
  225: 'Blonde Pulled-Back',
  226: 'Pink Pulled-Back',
  227: 'Purple Pulled-Back',
  228: 'Red Pulled-Back',
  229: 'Green Pulled-Back',
  230: 'Beige Shaggy',
  231: 'Caramel Shaggy',
  232: 'Cinnamon Shaggy',
  233: 'Brown Shaggy',
  234: 'Black Shaggy',
  235: 'Gray Shaggy',
  236: 'Blonde Shaggy',
  237: 'Beige Simple',
  238: 'Caramel Simple',
  239: 'Cinnamon Simple',
  240: 'Brown Simple',
  241: 'Black Simple',
  242: 'Gray Simple',
  243: 'Blonde Simple',
  244: 'Beige Spiky',
  245: 'Caramel Spiky',
  246: 'Cinnamon Spiky',
  247: 'Brown Spiky',
  248: 'Black Spiky',
  249: 'Gray Spiky',
  250: 'Green Spiky',
  251: 'Pink Spiky',
  252: 'Blonde Spiky',
  253: 'Red Spiky',
  254: 'Beige Straight',
  255: 'Caramel Straight',
  256: 'Cinnamon Straight',
  257: 'Brown Straight',
  258: 'Black Straight',
  259: 'Gray Straight',
  260: 'Blonde Straight',
  261: 'Pink Straight',
  262: 'Purple Straight',
};
export const MOUTHS = {
  263: 'Cigarette',
  264: 'Blue Cigarette',
  265: 'Joint',
  266: 'Blue Mask',
  267: 'White Mask',
  268: 'Black Mask',
  269: 'Orange Pacifier',
  270: 'Purple Pacifier',
  271: 'Party Horn',
  272: 'Brown Pipe',
  273: 'Gray Pipe',
  274: 'Black Vape',
  275: 'Blue Vape',
  276: 'Pink Vape',
};
export const BEARDS = {
  277: 'Beige Circle Beard',
  278: 'Caramel Circle Beard',
  279: 'Cinnamon Circle Beard',
  280: 'Brown Circle Beard',
  281: 'Black Circle Beard',
  282: 'Gray Circle Beard',
  283: 'Blonde Circle Beard',
  284: 'Beige Curtain',
  285: 'Caramel Curtain',
  286: 'Cinnamon Curtain',
  287: 'Brown Curtain',
  288: 'Black Curtain',
  289: 'Gray Curtain',
  290: 'Blonde Curtain',
  291: 'Beige Goatee',
  292: 'Caramel Goatee',
  293: 'Cinnamon Goatee',
  294: 'Brown Goatee',
  295: 'Black Goatee',
  296: 'Gray Goatee',
  297: 'Blonde Goatee',
  298: 'Beige Handlebar',
  299: 'Caramel Handlebar',
  300: 'Cinnamon Handlebar',
  301: 'Brown Handlebar',
  302: 'Black Handlebar',
  303: 'Gray Handlebar',
  304: 'Blonde Handlebar',
  305: 'Beige Huge Beard',
  306: 'Caramel Huge Beard',
  307: 'Cinnamon Huge Beard',
  308: 'Brown Huge Beard',
  309: 'Black Huge Beard',
  310: 'Gray Huge Beard',
  311: 'Blonde Huge Beard',
  312: 'Beige Huge Mustache',
  313: 'Caramel Huge Mustache',
  314: 'Cinnamon Huge Mustache',
  315: 'Brown Huge Mustache',
  316: 'Black Huge Mustache',
  317: 'Gray Huge Mustache',
  318: 'Blonde Huge Mustache',
  319: 'Beige Mustache',
  320: 'Caramel Mustache',
  321: 'Cinnamon Mustache',
  322: 'Brown Mustache',
  323: 'Black Mustache',
  324: 'Gray Mustache',
  325: 'Blonde Mustache',
  326: 'Beige Mutton',
  327: 'Caramel Mutton',
  328: 'Cinnamon Mutton',
  329: 'Brown Mutton',
  330: 'Black Mutton',
  331: 'Gray Mutton',
  332: 'Blonde Mutton',
  333: 'Beige Van Dyke',
  334: 'Caramel Van Dyke',
  335: 'Cinnamon Van Dyke',
  336: 'Brown Van Dyke',
  337: 'Black Van Dyke',
  338: 'Gray Van Dyke',
  339: 'Blonde Van Dyke',
};
export const TOPS = {
  340: 'Yellow Bra',
  341: 'Pink Bra',
  342: 'Purple Bra',
  343: 'White Bra',
  344: 'Gray Bra',
  345: 'Charcoal Bra',
  346: 'Black Bra',
  347: 'Blue Bra',
  348: 'Green Bra',
  349: 'Orange Bra',
  350: 'Beige Bra',
  351: 'White Crop Top',
  352: 'Gray Crop Top',
  353: 'Blue Crop Top',
  354: 'Yellow Crop Top',
  355: 'Orange Crop Top',
  356: 'Green Crop Top',
  357: 'Purple Crop Top',
  358: 'Pink Crop Top',
  359: 'Red Crop Top',
  360: 'Brown Crop Top',
  361: 'Black Crop Top',
  362: 'White Longsleeve',
  363: 'Gray Longsleeve',
  364: 'Blue Longsleeve',
  365: 'Yellow Longsleeve',
  366: 'Orange Longsleeve',
  367: 'Green Longsleeve',
  368: 'Purple Longsleeve',
  369: 'Pink Longsleeve',
  370: 'Red Longsleeve',
  371: 'Brown Longsleeve',
  372: 'Black Longsleeve',
  373: 'White Longsleeve Button-Up',
  374: 'Gray Longsleeve Button-Up',
  375: 'Blue Longsleeve Button-Up',
  376: 'Yellow Longsleeve Button-Up',
  377: 'Orange Longsleeve Button-Up',
  378: 'Green Longsleeve Button-Up',
  379: 'Purple Longsleeve Button-Up',
  380: 'Pink Longsleeve Button-Up',
  381: 'Red Longsleeve Button-Up',
  382: 'Brown Longsleeve Button-Up',
  383: 'Black Longsleeve Button-Up',
  384: 'White Longsleeve Collared',
  385: 'Gray Longsleeve Collared',
  386: 'Blue Longsleeve Collared',
  387: 'Yellow Longsleeve Collared',
  388: 'Orange Longsleeve Collared',
  389: 'Green Longsleeve Collared',
  390: 'Purple Longsleeve Collared',
  391: 'Pink Longsleeve Collared',
  392: 'Red Longsleeve Collared',
  393: 'Brown Longsleeve Collared',
  394: 'Black Longsleeve Collared',
  395: 'White Tank Top',
  396: 'Gray Tank Top',
  397: 'Blue Tank Top',
  398: 'Yellow Tank Top',
  399: 'Orange Tank Top',
  400: 'Green Tank Top',
  401: 'Purple Tank Top',
  402: 'Pink Tank Top',
  403: 'Red Tank Top',
  404: 'Brown Tank Top',
  405: 'Black Tank Top',
  406: 'White T-Shirt',
  407: 'Gray T-Shirt',
  408: 'Blue T-Shirt',
  409: 'Yellow T-Shirt',
  410: 'Orange T-Shirt',
  411: 'Green T-Shirt',
  412: 'Purple T-Shirt',
  413: 'Pink T-Shirt',
  414: 'Red T-Shirt',
  415: 'Brown T-Shirt',
  416: 'Black T-Shirt',
  417: 'White Collared T-Shirt',
  418: 'Gray Collared T-Shirt',
  419: 'Blue Collared T-Shirt',
  420: 'Yellow Collared T-Shirt',
  421: 'Orange Collared T-Shirt',
  422: 'Green Collared T-Shirt',
  423: 'Purple Collared T-Shirt',
  424: 'Pink Collared T-Shirt',
  425: 'Red Collared T-Shirt',
  426: 'Brown Collared T-Shirt',
  427: 'Black Collared T-Shirt',
  428: 'White Torn Vest',
  429: 'Gray Torn Vest',
  430: 'Blue Torn Vest',
  431: 'Yellow Torn Vest',
  432: 'Orange Torn Vest',
  433: 'Green Torn Vest',
  434: 'Purple Torn Vest',
  435: 'Pink Torn Vest',
  436: 'Red Torn Vest',
  437: 'Brown Torn Vest',
  438: 'Black Torn Vest',
};
export const OUTERWEAR = {
  439: 'Black Dinner Jacket',
  440: 'Purple Dinner Jacket',
  441: 'Green Dinner Jacket',
  442: 'White Dinner Jacket',
  443: 'Brown Dinner Jacket',
  444: 'Salmon Dinner Jacket',
  445: 'Yellow Dinner Jacket',
  446: 'Pink Dinner Jacket',
  447: 'Blue Dinner Jacket',
  448: 'Red Dinner Jacket',
  449: 'Black Hoodie',
  450: 'Black/Purple Hoodie',
  451: 'Yellow/Green Hoodie',
  452: 'Gray/White Hoodie',
  453: 'Brown Hoodie',
  454: 'Blue/Purple Hoodie',
  455: 'Purple/Yellow Hoodie',
  456: 'Purple/Pink Hoodie',
  457: 'Navy Hoodie',
  458: 'Red Hoodie',
  459: 'Black Closed Jacket',
  460: 'Purple Closed Jacket',
  461: 'Green Closed Jacket',
  462: 'White Closed Jacket',
  463: 'Brown Closed Jacket',
  464: 'Salmon Closed Jacket',
  465: 'Yellow Closed Jacket',
  466: 'Pink Closed Jacket',
  467: 'Blue Closed Jacket',
  468: 'Red Closed Jacket',
  469: 'Brown Elbowpatch Jacket',
  470: 'Purple Elbowpatch Jacket',
  471: 'Green Elbowpatch Jacket',
  472: 'White Elbowpatch Jacket',
  473: 'Black Elbowpatch Jacket',
  474: 'Salmon Elbowpatch Jacket',
  475: 'Yellow Elbowpatch Jacket',
  476: 'Pink Elbowpatch Jacket',
  477: 'Blue Elbowpatch Jacket',
  478: 'Red Elbowpatch Jacket',
  479: 'Black Open Jacket',
  480: 'Purple Open Jacket',
  481: 'Green Open Jacket',
  482: 'White Open Jacket',
  483: 'Brown Open Jacket',
  484: 'Salmon Open Jacket',
  485: 'Yellow Open Jacket',
  486: 'Pink Open Jacket',
  487: 'Blue Open Jacket',
  488: 'Red Open Jacket',
  489: 'Brown Mummy Top',
  490: 'Beige Mummy Top',
  491: 'White Mummy Top',
  492: 'Brown Mummy Costume',
  493: 'Beige Mummy Costume',
  494: 'White Mummy Costume',
  495: 'Denim Overalls',
  496: 'Purple Overalls',
  497: 'Pink Overalls',
  498: 'Green Overalls',
  499: 'Blue Overalls',
  500: 'Yellow Overalls',
  501: 'Orange Prison Robe',
  502: 'Red Prison Robe',
  503: 'Yellow Prison Robe',
  504: 'Gray Prison Robe',
  505: 'Gray Waistcoat',
  506: 'Black Waistcoat',
  507: 'Green Waistcoat',
  508: 'White Waistcoat',
  509: 'Beige Waistcoat',
  510: 'Purple Waistcoat',
  511: 'Yellow Waistcoat',
  512: 'Pink Waistcoat',
  513: 'Blue Waistcoat',
  514: 'Red Waistcoat',
};
export const PRINTS = {
  515: 'Banana',
  516: 'Baseball Bat',
  517: 'Purple Baseball Bat',
  518: 'Beer',
  519: 'Bomb',
  520: 'Burger',
  521: 'Cactus',
  522: 'Gold Cactus',
  523: 'Carrot',
  524: 'Dino',
  525: 'Purple Dino',
  526: 'Orange Dino',
  527: 'Beige Dino',
  528: 'Yellow Dino',
  529: 'Blue Dino',
  530: 'Duck',
  531: 'Eyeball',
  532: 'Red Eyeball',
  533: 'Purple Eyeball',
  534: 'Red Heart',
  535: 'Blue Heart',
  536: 'Purple Heart',
  537: 'Pink Heart',
  538: 'Yellow Heart',
  539: 'Ice Cream',
  540: 'Pink Ice Cream',
  541: 'Moon',
  542: 'White Number 15',
  543: 'Yellow Number 15',
  544: 'Blue Number 15',
  545: 'Blue Number One',
  546: 'Yellow Number One',
  547: 'Green Number One',
  548: 'Pow',
  549: 'Rock On',
  550: 'White Skull',
  551: 'Black Skull',
  552: 'Brown Skull',
  553: 'Blue Smile',
  554: 'Yellow Smile',
  555: 'Sun',
};
export const BOTTOMS = {
  556: 'White Boxers',
  557: 'Red Boxers',
  558: 'Green Boxers',
  559: 'Pink Boxers',
  560: 'Yellow Boxers',
  561: 'Black Boxers',
  562: 'Gray Boxers',
  563: 'Blue Boxers',
  564: 'Purple Boxers',
  565: 'Red/White Polkadot Boxers',
  566: 'Purple/Yellow Polkadot Boxers',
  567: 'Blue/White Polkadot Boxers',
  568: 'Black/Gray Polkadot Boxers',
  569: 'Black/Brown Polkadot Boxers',
  570: 'White/Pink Polkadot Boxers',
  571: 'White/Blue Striped Boxers',
  572: 'Purple/Yellow Striped Boxers',
  573: 'Red/White Striped Boxers',
  574: 'Black/Gray Striped Boxers',
  575: 'Brown/Black Striped Boxers',
  576: 'White Briefs',
  577: 'Red Briefs',
  578: 'Green Briefs',
  579: 'Pink Briefs',
  580: 'Yellow Briefs',
  581: 'Black Briefs',
  582: 'Gray Briefs',
  583: 'Blue Briefs',
  584: 'Purple Briefs',
  585: 'Yellow G-String',
  586: 'Pink G-String',
  587: 'Purple G-String',
  588: 'Blue G-String',
  589: 'Red G-String',
  590: 'Green G-String',
  591: 'Dark Purple G-String',
  592: 'Black G-String',
  593: 'White G-String',
  594: 'Black Jeans',
  595: 'Green Jeans',
  596: 'Gray Jeans',
  597: 'Denim Jeans',
  598: 'White Jeans',
  599: 'Beige Kneepatch Jeans',
  600: 'Purple Kneepatch Jeans',
  601: 'Green Kneepatch Jeans',
  602: 'White Kneepatch Jeans',
  603: 'Gray Kneepatch Jeans',
  604: 'Salmon Kneepatch Jeans',
  605: 'Yellow Kneepatch Jeans',
  606: 'Pink Kneepatch Jeans',
  607: 'Blue Kneepatch Jeans',
  608: 'Red Kneepatch Jeans',
  609: 'Denim Jorts',
  610: 'Black Jorts',
  611: 'Green Jorts',
  612: 'Gray Jorts',
  613: 'Beige Jorts',
  614: 'Denim Frayed Jorts',
  615: 'Black Frayed Jorts',
  616: 'Green Frayed Jorts',
  617: 'Gray Frayed Jorts',
  618: 'Beige Frayed Jorts',
  619: 'Brown Mummy Pants',
  620: 'Beige Mummy Pants',
  621: 'White Mummy Pants',
  622: 'Black Pants',
  623: 'Green Pants',
  624: 'Gray Pants',
  625: 'Brown Pants',
  626: 'Dark Red Pants',
  627: 'Yellow Pants',
  628: 'Purple Pants',
  629: 'Blue Pants',
  630: 'Red Pants',
  631: 'Dark Purple Pants',
  632: 'White Pants',
  633: 'Salmon Skirt',
  634: 'Gray Skirt',
  635: 'Black Skirt',
  636: 'Dark Purple Skirt',
  637: 'Yellow Skirt',
  638: 'Purple Skirt',
  639: 'Pink Skirt',
  640: 'Brown Skirt',
  641: 'White Skirt',
  642: 'Blue Skirt',
  643: 'Green Skirt',
  644: 'Dark Blue Track Pants',
  645: 'Dark Purple Track Pants',
  646: 'Green Track Pants',
  647: 'White Track Pants',
  648: 'Beige Track Pants',
  649: 'Salmon Track Pants',
  650: 'Yellow Track Pants',
  651: 'Pink Track Pants',
  652: 'Blue Track Pants',
  653: 'Dark Red Track Pants',
  654: 'White/Gray Zebra Pants',
  655: 'White/Purple Zebra Pants',
  656: 'Black/White Zebra Pants',
  657: 'Pink/Black Zebra Pants',
};
export const FOOTWEAR = {
  658: 'Purple Basic Shoes',
  659: 'Green Basic Shoes',
  660: 'Pink Basic Shoes',
  661: 'White Basic Shoes',
  662: 'Yellow Basic Shoes',
  663: 'Black Basic Shoes',
  664: 'Dark Purple Basic Shoes',
  665: 'Duck Shoes',
  666: 'Black Duck Shoes',
  667: 'Purple Duck Shoes',
  668: 'Purple/Yellow Jester Shoes',
  669: 'Pink/Purple Jester Shoes',
  670: 'Yellow/Blue Jester Shoes',
  671: 'Pink/White Jester Shoes',
  672: 'Brown Mummy Shoes',
  673: 'Beige Mummy Shoes',
  674: 'White Mummy Shoes',
  675: 'Red/White Running Shoes',
  676: 'Purple/Blue Running Shoes',
  677: 'Yellow/Gray Running Shoes',
  678: 'Gray/Black Running Shoes',
  679: 'White/Gray Space Boots',
  680: 'White/Purple Space Boots',
  681: 'Yellow/White Space Boots',
  682: 'Orange/White Space Boots',
  683: 'Yellow/Pink Space Boots',
  684: 'Yellow/White Winged Shoes',
  685: 'Blue Winged Shoes',
  686: 'Yellow/Orange Winged Shoes',
  687: 'Red/Green Winged Shoes',
  688: 'Purple/Yellow Winged Shoes',
  689: 'Brown/Blue Winged Shoes',
  690: 'Brown Work Boots',
  691: 'Green Work Boots',
  692: 'Pink Work Boots',
  693: 'Blue Work Boots',
  694: 'Red/Yellow Work Boots',
};
export const BELTS = {
  695: 'Brown Basic',
  696: 'Black Basic',
  697: 'Pink Basic',
  698: 'Green Basic',
  699: 'Purple/Blue Striped',
  700: 'Black/White Striped',
  701: 'Red/White Striped',
  702: 'Purple/Pink Striped',
  703: 'Yellow/Orange Striped',
  704: 'Purple/Yellow Striped',
  705: 'Black Studded',
  706: 'White Studded',
};
export const HATS = {
  707: 'Red Baseball Cap',
  708: 'Charcoal Baseball Cap',
  709: 'Black Baseball Cap',
  710: 'Blue Baseball Cap',
  711: 'Gray Baseball Cap',
  712: 'Green Baseball Cap',
  713: 'Pink Baseball Cap',
  714: 'Red Beanie',
  715: 'Dark Gray Beanie',
  716: 'Green Beanie',
  717: 'Gray Beanie',
  718: 'Charcoal Beanie',
  719: 'Black Bowler Hat',
  720: 'Purple Bowler Hat',
  721: 'Green Bowler Hat',
  722: 'Red Bowler Hat',
  723: 'Yellow Construction Helmet',
  724: 'Red Construction Helmet',
  725: 'Black Construction Helmet',
  726: 'Blue Construction Helmet',
  727: 'Brown Cowboy Hat',
  728: 'Pink Cowboy Hat',
  729: 'Gold Crown',
  730: 'White Gold Crown',
  731: 'Platinum Crown',
  732: 'Blue Fish Hat',
  733: 'Yellow Fish Hat',
  734: 'Hamburger',
  735: 'Brown Viking Helmet',
  736: 'Silver Viking Helmet',
  737: 'Propeller Hat',
  738: 'Party Hat',
  739: 'Red/White Party Hat',
  740: 'Pirate Hat',
  741: 'Blue Police Hat',
  742: 'White/Gold Police Hat',
  743: 'White/Platinum Police Hat',
  744: 'Black Police Hat',
  745: 'Santa Hat',
  746: 'Sombrero',
  747: 'Top Hat',
  748: 'Orange Traffic Cone',
  749: 'Green Traffic Cone',
};
export const EYEWEAR = {
  750: 'Purple Broken Glasses',
  751: 'Blue Broken Glasses',
  752: 'Orange Broken Glasses',
  753: 'Green Broken Glasses',
  754: 'Gray Broken Glasses',
  755: 'Red Broken Glasses',
  756: 'Titanium Cyborg Eye',
  757: 'Gold Cyborg Eye',
  758: 'Eyepatch',
  759: 'White Skull Eyepatch',
  760: 'Yellow Skull Eyepatch',
  761: 'Black VR Headset',
  762: 'White VR Headset',
  763: 'Monocle',
  764: 'Gold Monocle',
  765: 'Purple/Black Skinny Sunglasses',
  766: 'Black/Silver Skinny Sunglasses',
  767: 'Orange/White Skinny Sunglasses',
  768: 'Blue/Purple Skinny Sunglasses',
  769: 'Red/Yellow Skinny Sunglasses',
  770: 'Red Shutter Shades',
  771: 'Blue Shutter Shades',
  772: 'Yellow Shutter Shades',
  773: 'Green Shutter Shades',
  774: 'Pink Shutter Shades',
  775: 'Gray Shutter Shades',
  776: 'Blue Rectangle Glasses',
  777: 'Red Rectangle Glasses',
  778: 'Yellow Rectangle Glasses',
  779: 'Gray Rectangle Glasses',
  780: 'Brown Rectangle Glasses',
  781: 'Black Rectangle Glasses',
  782: 'Purple/Black Shades',
  783: 'Gold/Brown Shades',
  784: 'Silver Shades',
  785: 'Black/Silver Shades',
  786: 'Black/Gold Shades',
  787: 'Black/Orange Shades',
  788: 'Black/Blue Shades',
  789: 'Steampunk Goggles',
  790: 'Gold Steampunk Goggles',
  791: 'Black Steampunk Goggles',
  792: 'Black Sunglasses',
  793: 'Black/Blue Sunglasses',
  794: 'Purple Sunglasses',
  795: 'Brown Sunglasses',
  796: 'Titanum/Orange Visor',
  797: 'Titanium/Blue Visor',
  798: 'Gold/Blue Visor',
  799: 'Gold/Red Visor',
};
export const PIERCINGS = {
  800: 'Diamond Stud',
  801: 'White Diamond Stud',
  802: 'Gold Diamond Stud',
  803: 'Black Diamond Stud',
  804: 'Gold Earring',
  805: 'Platinum Earring',
  806: 'Black Earring',
  807: 'Gold Nose Ring',
  808: 'Platinum Nose Ring',
  809: 'Black Nose Ring',
};
export const WRISTS = {
  810: 'Yellow/Green Sweatband',
  811: 'Pink/Purple Sweatband',
  812: 'Yellow/Orange Sweatband',
  813: 'Pink/Blue Sweatband',
  814: 'Black/White Sweatband',
  815: 'White/Red Sweatband',
  816: 'Yellow/Purple Sweatband',
  817: 'Blue Watch',
  818: 'Pink Watch',
  819: 'Black Watch',
  820: 'Brown Watch',
  821: 'Gold Watch',
};
export const HANDS = {
  822: 'Red Boxing Gloves',
  823: 'White Boxing Gloves',
  824: 'Blue Boxing Gloves',
  825: 'Yellow Boxing Gloves',
  826: 'Black Boxing Gloves',
  827: 'White Cartoon Gloves',
  828: 'Pink Cartoon Gloves',
  829: 'Yellow Cartoon Gloves',
  830: 'Red Crab Claws',
  831: 'Yellow Crab Claws',
  832: 'Blue Crab Claws',
  833: 'Purple Crab Claws',
  834: 'Black Gloves',
  835: 'Gray Gloves',
  836: 'Yellow Gloves',
  837: 'white Gloves',
  838: 'Pink Gloves',
  839: 'Green Gloves',
  840: 'Blue Gloves',
  841: 'Purple Gloves',
  842: 'Blue/White Mittens',
  843: 'Purple/Pink Mittens',
  844: 'Pink/Blue Mittens',
  845: 'Purple/Yellow Mittens',
  846: 'Green/Red Mittens',
};
export const NECKWEAR = {
  847: 'Black Bowtie',
  848: 'Brown Bowtie',
  849: 'Red Bowtie',
  850: 'Green Bowtie',
  851: 'Pink Bowtie',
  852: 'Purple Bowtie',
  853: 'Yellow Bowtie',
  854: 'White Bowtie',
  855: 'Gray Bowtie',
  856: 'Charcoal Bowtie',
  857: 'Blue Bowtie',
  858: 'Beige Bowtie',
  859: 'Bright Green Bowtie',
  860: 'Green Dollar Sign Necklace',
  861: 'Gold Dollar Sign Necklace',
  862: 'Bright Gold Dollar Sign Necklace',
  863: 'Silver Dollar Sign Necklace',
  864: 'Platinum Dollar Sign Necklace',
  865: 'Titanium Dollar Sign Necklace',
  866: 'Gold Medal Necklace',
  867: 'Platinum Medal Necklace',
  868: 'Titanium Medal Necklace',
  869: 'Purple Medal Necklace',
  870: 'Black Tie',
  871: 'Brown Tie',
  872: 'Red Tie',
  873: 'Dark Purple Tie',
  874: 'Green Tie',
  875: 'Pink Tie',
  876: 'Purple Tie',
  877: 'Yellow Tie',
  878: 'White Tie',
  879: 'Gray Tie',
  880: 'Charcoal Tie',
  881: 'Blue Tie',
  882: 'Beige Tie',
  883: 'Bright Green Tie',
};
export const LEFT_ITEMS = {
  884: 'Arrow',
  885: 'Axe',
  886: 'Gold Axe',
  887: 'Green Balloon',
  888: 'Blue Balloon',
  889: 'White Balloon',
  890: 'Yellow Balloon',
  891: 'Red Balloon',
  892: 'Purple Balloon',
  893: 'Black Balloon',
  894: 'Banana',
  895: 'Beer',
  896: 'Big Sword',
  897: 'Boombox',
  898: 'Booster Sword',
  899: 'Bottle',
  900: 'Bow',
  901: 'Black Bowling Ball',
  902: 'Red Bowling Ball',
  903: 'Purple Bowling Ball',
  904: 'Blue Bowling Ball',
  905: 'Yellow Bowling Ball',
  906: 'Briefcase',
  907: 'Chainsaw',
  908: 'Controller',
  909: 'Crowbar',
  910: 'Dynamite',
  911: 'Red Electric Guitar',
  912: 'Black Electric Guitar',
  913: 'Blue Electric Guitar',
  914: 'Purple Electric Guitar',
  915: 'Energy Sword',
  916: 'Eye Wand',
  917: 'Fish',
  918: 'Yellow Fish',
  919: 'Flail',
  920: 'Gray Footscooter',
  921: 'Blue Footscooter',
  922: 'Pink Footscooter',
  923: 'Yellow Footscooter',
  924: 'Green Footscooter',
  925: 'Frying Pan Eggs & Bacon',
  926: 'Gold Ring',
  927: 'Gun',
  928: 'Key',
  929: 'Keyboard',
  930: 'Laptop',
  931: 'Leatherbag',
  932: 'Lifebuoy Ring',
  933: 'Pink/Red Longboard',
  934: 'Yellow/Purple Longboard',
  935: 'Blue/Orange Longboard',
  936: 'Red/Green Longboard',
  937: 'Magnet',
  938: 'Money Bag',
  939: 'Nunchucks',
  940: 'Poop',
  941: 'Potion',
  942: 'Rope',
  943: "Rubik's Cube",
  944: 'Sai',
  945: 'Gray Scooter',
  946: 'Purple Scooter',
  947: 'Red Scooter',
  948: 'Black Scooter',
  949: 'Scythe',
  950: 'Sherbet Ice Cream',
  951: 'Red/Yellow Skateboard',
  952: 'Green/Orange Skateboard',
  953: 'Purple/Yellow Skateboard',
  954: 'Skull',
  955: 'Soccer Ball',
  956: 'Spade',
  957: 'Spring',
  958: 'Stick',
  959: 'Sword',
  960: 'Gold Sword',
  961: 'Toilet Paper',
  962: 'Platinum Toilet Paper',
  963: 'Gold Toilet Paper',
  964: 'Trumpet',
  965: 'Pink Umbrella',
  966: 'Yellow Umbrella',
  967: 'Blue Umbrella',
  968: 'Red Umbrella',
  969: 'Vanilla Ice Cream',
  970: 'Vhs Tape',
  971: 'Wand',
  972: 'Yellow Yoyo',
  973: 'Green Yoyo',
  974: 'Pink Yoyo',
  975: 'Blue Yoyo',
};
export const RIGHT_ITEMS = {
  976: 'Arrow',
  977: 'Axe',
  978: 'Gold Axe',
  979: 'Green Balloon',
  980: 'Blue Balloon',
  981: 'White Balloon',
  982: 'Yellow Balloon',
  983: 'Red Balloon',
  984: 'Purple Balloon',
  985: 'Black Balloon',
  986: 'Beer',
  987: 'Bottle',
  988: 'Bread',
  989: 'Briefcase',
  990: 'Cheeseburger',
  991: 'Controller',
  992: 'Crowbar',
  993: 'Cutlass',
  994: 'Diamond',
  995: 'Dynamite',
  996: 'Energy Sword',
  997: 'Frying Pan',
  998: 'Frying Pan Eggs & Bacon',
  999: 'Gun',
  1000: 'Hammer',
  1001: 'Keyboard',
  1002: 'Laptop',
  1003: 'Lifebuoy Ring',
  1004: 'Pencil',
  1005: 'Poop',
  1006: 'Potion',
  1007: 'Present',
  1008: "Rubik's Cube",
  1009: 'Sai',
  1010: 'Plasma Wand',
  1011: 'Scythe',
  1012: 'Sherbet Ice Cream',
  1013: 'Sickle',
  1014: 'Snake',
  1015: 'Spiked Mace',
  1016: 'Sword',
  1017: 'Gold Sword',
  1018: 'Pink Umbrella',
  1019: 'Yellow Umbrella',
  1020: 'Blue Umbrella',
  1021: 'Red Umbrella',
  1022: 'Vanilla Ice Cream',
  1023: 'Wand',
};

export const TRAIT_VALUE_MAP = {
  ...TRIBES,
  ...SKIN_COLORS,
  ...FUR_COLORS,
  ...EYE_COLORS,
  ...PUPIL_COLORS,
  ...HAIR,
  ...MOUTHS,
  ...BEARDS,
  ...TOPS,
  ...OUTERWEAR,
  ...PRINTS,
  ...BOTTOMS,
  ...FOOTWEAR,
  ...BELTS,
  ...HATS,
  ...EYEWEAR,
  ...PIERCINGS,
  ...WRISTS,
  ...HANDS,
  ...NECKWEAR,
  ...LEFT_ITEMS,
  ...RIGHT_ITEMS,
};
