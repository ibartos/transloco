import { HttpContextToken } from "@angular/common/http";

export const SKIPP_ERROR_HANDLING = new HttpContextToken<boolean>(() => false);
export const NO_RETRY = new HttpContextToken<boolean>(() => false);

export const STAKE_VALUES = [
    { value: 10, id: 1 },
    { value: 25, id: 2 },
    { value: 50, id: 3 },
    { value: 100, id: 4 },
];

export const COUNTRY_FLAGS: Record<string, string> = {
    ABW: "aw", // Aruba
    AFG: "af", // Afghanistan
    AGO: "ao", // Angola
    AIA: "ai", // Anguilla
    ALA: "ax", // Åland Islands
    ALB: "al", // Albania
    AND: "ad", // Andorra
    ARE: "ae", // United Arab Emirates
    ARG: "ar", // Argentina
    ARM: "am", // Armenia
    ASM: "as", // American Samoa
    ATA: "aq", // Antarctica
    ATF: "tf", // French Southern Territories
    ATG: "ag", // Antigua and Barbuda
    AUS: "au", // Australia
    AUT: "at", // Austria
    AZE: "az", // Azerbaijan
    BDI: "bi", // Burundi
    BEL: "be", // Belgium
    BEN: "bj", // Benin
    BES: "bq", // Bonaire, Sint Eustatius and Saba
    BFA: "bf", // Burkina Faso
    BGD: "bd", // Bangladesh
    BGR: "bg", // Bulgaria
    BHR: "bh", // Bahrain
    BHS: "bs", // Bahamas
    BIH: "ba", // Bosnia and Herzegovina
    BLM: "bl", // Saint Barthélemy
    BLR: "by", // Belarus
    BLZ: "bz", // Belize
    BMU: "bm", // Bermuda
    BOL: "bo", // Bolivia (Plurinational State of)
    BRA: "br", // Brazil
    BRB: "bb", // Barbados
    BRN: "bn", // Brunei Darussalam
    BTN: "bt", // Bhutan
    BVT: "bv", // Bouvet Island
    BWA: "bw", // Botswana
    CAF: "cf", // Central African Republic
    CAN: "ca", // Canada
    CCK: "cc", // Cocos (Keeling) Islands
    CHE: "ch", // Switzerland
    CHL: "cl", // Chile
    CHN: "cn", // China
    CIV: "ci", // Côte d'Ivoire
    CMR: "cm", // Cameroon
    COD: "cd", // Congo, Democratic Republic of the
    COG: "cg", // Congo
    COK: "ck", // Cook Islands
    COL: "co", // Colombia
    COM: "km", // Comoros
    CPV: "cv", // Cabo Verde
    CRI: "cr", // Costa Rica
    CUB: "cu", // Cuba
    CUW: "cw", // Curaçao
    CXR: "cx", // Christmas Island
    CYM: "ky", // Cayman Islands
    CYP: "cy", // Cyprus
    CZE: "cz", // Czechia
    DEU: "de", // Germany
    DJI: "dj", // Djibouti
    DMA: "dm", // Dominica
    DNK: "dk", // Denmark
    DOM: "do", // Dominican Republic
    DZA: "dz", // Algeria
    ECU: "ec", // Ecuador
    EGY: "eg", // Egypt
    ENG: "gb-eng", // England
    ERI: "er", // Eritrea
    ESH: "eh", // Western Sahara
    ESP: "es", // Spain
    EST: "ee", // Estonia
    ETH: "et", // Ethiopia
    FIN: "fi", // Finland
    FJI: "fj", // Fiji
    FLK: "fk", // Falkland Islands (Malvinas)
    FRA: "fr", // France
    FRO: "fo", // Faroe Islands
    FSM: "fm", // Micronesia (Federated States of)
    GAB: "ga", // Gabon
    GBR: "gb-eng", // England
    // GBR: "gb", // United Kingdom of Great Britain and Northern Ireland
    GEO: "ge", // Georgia
    GGY: "gg", // Guernsey
    GHA: "gh", // Ghana
    GIB: "gi", // Gibraltar
    GIN: "gn", // Guinea
    GLP: "gp", // Guadeloupe
    GMB: "gm", // Gambia
    GNB: "gw", // Guinea-Bissau
    GNQ: "gq", // Equatorial Guinea
    GRC: "gr", // Greece
    GRD: "gd", // Grenada
    GRL: "gl", // Greenland
    GTM: "gt", // Guatemala
    GUF: "gf", // French Guiana
    GUM: "gu", // Guam
    GUY: "gy", // Guyana
    HKG: "hk", // Hong Kong
    HMD: "hm", // Heard Island and McDonald Islands
    HND: "hn", // Honduras
    HRV: "hr", // Croatia
    HTI: "ht", // Haiti
    HUN: "hu", // Hungary
    IDN: "id", // Indonesia
    IMN: "im", // Isle of Man
    IND: "in", // India
    IOT: "io", // British Indian Ocean Territory
    IRL: "ie", // Ireland
    IRN: "ir", // Iran (Islamic Republic of)
    IRQ: "iq", // Iraq
    ISL: "is", // Iceland
    ISR: "il", // Israel
    ITA: "it", // Italy
    JAM: "jm", // Jamaica
    JEY: "je", // Jersey
    JOR: "jo", // Jordan
    JPN: "jp", // Japan
    KAZ: "kz", // Kazakhstan
    KEN: "ke", // Kenya
    KGZ: "kg", // Kyrgyzstan
    KHM: "kh", // Cambodia
    KIR: "ki", // Kiribati
    KNA: "kn", // Saint Kitts and Nevis
    KOR: "kr", // Korea (Republic of)
    KWT: "kw", // Kuwait
    LAO: "la", // Lao People's Democratic Republic
    LBN: "lb", // Lebanon
    LBR: "lr", // Liberia
    LBY: "ly", // Libya
    LCA: "lc", // Saint Lucia
    LIE: "li", // Liechtenstein
    LKA: "lk", // Sri Lanka
    LSO: "ls", // Lesotho
    LTU: "lt", // Lithuania
    LUX: "lu", // Luxembourg
    LVA: "lv", // Latvia
    MAC: "mo", // Macao
    MAF: "mf", // Saint Martin (French part)
    MAR: "ma", // Morocco
    MCO: "mc", // Monaco
    MDA: "md", // Moldova (Republic of)
    MDG: "mg", // Madagascar
    MDV: "mv", // Maldives
    MEX: "mx", // Mexico
    MHL: "mh", // Marshall Islands
    MKD: "mk", // North Macedonia
    MLI: "ml", // Mali
    MLT: "mt", // Malta
    MMR: "mm", // Myanmar
    MNE: "me", // Montenegro
    MNG: "mn", // Mongolia
    MNP: "mp", // Northern Mariana Islands
    MOZ: "mz", // Mozambique
    MRT: "mr", // Mauritania
    MSR: "ms", // Montserrat
    MTQ: "mq", // Martinique
    MUS: "mu", // Mauritius
    MWI: "mw", // Malawi
    MYS: "my", // Malaysia
    MYT: "yt", // Mayotte
    NAM: "na", // Namibia
    NCL: "nc", // New Caledonia
    NER: "ne", // Niger
    NFK: "nf", // Norfolk Island
    NGA: "ng", // Nigeria
    NIC: "ni", // Nicaragua
    NIU: "nu", // Niue
    NLD: "nl", // Netherlands
    NOR: "no", // Norway
    NPL: "np", // Nepal
    NRU: "nr", // Nauru
    NZL: "nz", // New Zealand
    OMN: "om", // Oman
    PAK: "pk", // Pakistan
    PAN: "pa", // Panama
    PCN: "pn", // Pitcairn
    PER: "pe", // Peru
    PHL: "ph", // Philippines
    PLW: "pw", // Palau
    PNG: "pg", // Papua New Guinea
    POL: "pl", // Poland
    PRI: "pr", // Puerto Rico
    PRK: "kp", // Korea (Democratic People's Republic of)
    PRT: "pt", // Portugal
    PRY: "py", // Paraguay
    PSE: "ps", // Palestine, State of
    PYF: "pf", // French Polynesia
    QAT: "qa", // Qatar
    REU: "re", // Réunion
    ROU: "ro", // Romania
    RUS: "ru", // Russian Federation
    RWA: "rw", // Rwanda
    SAU: "sa", // Saudi Arabia
    SDN: "sd", // Sudan
    SEN: "sn", // Senegal
    SGP: "sg", // Singapore
    SGS: "gs", // South Georgia and the South Sandwich Islands
    SHN: "sh", // Saint Helena, Ascension and Tristan da Cunha
    SJM: "sj", // Svalbard and Jan Mayen
    SLB: "sb", // Solomon Islands
    SLE: "sl", // Sierra Leone
    SLV: "sv", // El Salvador
    SMR: "sm", // San Marino
    SOM: "so", // Somalia
    SPM: "pm", // Saint Pierre and Miquelon
    SRB: "rs", // Serbia
    SSD: "ss", // South Sudan
    STP: "st", // Sao Tome and Principe
    SUR: "sr", // Suriname
    SVK: "sk", // Slovakia
    SVN: "si", // Slovenia
    SWE: "se", // Sweden
    SWZ: "sz", // Eswatini
    SXM: "sx", // Sint Maarten (Dutch part)
    SYC: "sc", // Seychelles
    SYR: "sy", // Syrian Arab Republic
    TCA: "tc", // Turks and Caicos Islands
    TCD: "td", // Chad
    TGO: "tg", // Togo
    THA: "th", // Thailand
    TJK: "tj", // Tajikistan
    TKL: "tk", // Tokelau
    TKM: "tm", // Turkmenistan
    TLS: "tl", // Timor-Leste
    TON: "to", // Tonga
    TTO: "tt", // Trinidad and Tobago
    TUN: "tn", // Tunisia
    TUR: "tr", // Turkey
    TUV: "tv", // Tuvalu
    TWN: "tw", // Taiwan, Province of China[a]
    TZA: "tz", // Tanzania, United Republic of
    UGA: "ug", // Uganda
    UKR: "ua", // Ukraine
    UMI: "um", // United States Minor Outlying Islands
    URY: "uy", // Uruguay
    USA: "us", // United States of America
    UZB: "uz", // Uzbekistan
    VAT: "va", // Holy See
    VCT: "vc", // Saint Vincent and the Grenadines
    VEN: "ve", // Venezuela (Bolivarian Republic of)
    VGB: "vg", // Virgin Islands (British)
    VIR: "vi", // Virgin Islands (U.S.)
    VNM: "vn", // Viet Nam
    VUT: "vu", // Vanuatu
    WLF: "wf", // Wallis and Futuna
    WSM: "ws", // Samoa
    YEM: "ye", // Yemen
    ZAF: "za", // South Africa
    ZMB: "zm", // Zambia
    ZWE: "zw", // Zimbabwe
    INT: "int", // International
};
