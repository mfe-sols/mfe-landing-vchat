/* ── Landing Model – VChat Business Platform ────────────────
   Pure data layer — VChat product content.
   Keys reference i18n domain short-keys.
   ───────────────────────────────────────────────────────── */

export type HeroStat = { labelKey: string; value: string };

export type ModuleHighlight = { titleKey: string; descKey: string; iconKey: string; highlights: string[] };

export type ArchBlock = { titleKey: string; descKey: string; items: string[] };

export type SecurityLayer = { titleKey: string; items: string[] };

export type TechRow = { layerKey: string; techKey: string };

export type CodeMetric = { labelKey: string; value: string };

export type PlatformRow = { platformKey: string; formatKey: string; archKey: string };

export type DeployRow = { labelKey: string; saasKey: string; vchatKey: string };

export type IdealSegment = { icon: string; titleKey: string; descKey: string };

export type CompetitiveRow = {
  featureKey: string;
  vchatKey: string;
  cloudPosKey: string;
  erpKey: string;
};

export type OneLiner = { labelKey: string; textKey: string };

export type LandingModel = {
  heroStats: HeroStat[];
  modules: ModuleHighlight[];
  archBlocks: ArchBlock[];
  secLayers: SecurityLayer[];
  techStack: TechRow[];
  codeMetrics: CodeMetric[];
  platforms: PlatformRow[];
  deployModel: DeployRow[];
  idealSegments: IdealSegment[];
  competitive: CompetitiveRow[];
  compliance: string[];
  oneLiners: OneLiner[];
};

export const createModel = (): LandingModel => ({
  heroStats: [
    { labelKey: "statModules", value: "9" },
    { labelKey: "statModels", value: "257" },
    { labelKey: "statCloud", value: "Zero" },
  ],

  modules: [
    {
      titleKey: "modPos", descKey: "modPosDesc", iconKey: "pos",
      highlights: ["posH1","posH2","posH3","posH4","posH5","posH6","posH7","posH8","posH9","posH10","posH11"],
    },
    {
      titleKey: "modAccounting", descKey: "modAccountingDesc", iconKey: "accounting",
      highlights: ["accH1","accH2","accH3","accH4","accH5","accH6","accH7","accH8","accH9","accH10","accH11","accH12","accH13"],
    },
    {
      titleKey: "modHr", descKey: "modHrDesc", iconKey: "hr",
      highlights: ["hrH1","hrH2","hrH3","hrH4","hrH5","hrH6","hrH7","hrH8","hrH9"],
    },
    {
      titleKey: "modInventory", descKey: "modInventoryDesc", iconKey: "inventory",
      highlights: ["invH1","invH2","invH3","invH4","invH5","invH6","invH7","invH8","invH9","invH10","invH11"],
    },
    {
      titleKey: "modChat", descKey: "modChatDesc", iconKey: "chat",
      highlights: ["chatH1","chatH2","chatH3","chatH4","chatH5","chatH6","chatH7","chatH8","chatH9","chatH10"],
    },
    {
      titleKey: "modRisk", descKey: "modRiskDesc", iconKey: "risk",
      highlights: ["riskH1","riskH2","riskH3","riskH4"],
    },
    {
      titleKey: "modAdmin", descKey: "modAdminDesc", iconKey: "admin",
      highlights: ["adminH1","adminH2","adminH3","adminH4"],
    },
    {
      titleKey: "modVkiosk", descKey: "modVkioskDesc", iconKey: "vkiosk",
      highlights: ["vkioskH1","vkioskH2","vkioskH3","vkioskH4","vkioskH5"],
    },
    {
      titleKey: "modPayment", descKey: "modPaymentDesc", iconKey: "payment",
      highlights: ["payH1","payH2","payH3","payH4","payH5"],
    },
  ],

  archBlocks: [
    {
      titleKey: "archLan", descKey: "archLanDesc",
      items: ["archLanI1","archLanI2","archLanI3","archLanI4","archLanI5","archLanI6"],
    },
    {
      titleKey: "archBinary", descKey: "archBinaryDesc",
      items: ["archBinI1","archBinI2","archBinI3","archBinI4","archBinI5"],
    },
  ],

  secLayers: [
    { titleKey: "secNetwork", items: ["secNet1","secNet2","secNet3","secNet4"] },
    { titleKey: "secApp", items: ["secApp1","secApp2","secApp3","secApp4","secApp5","secApp6"] },
    { titleKey: "secHttp", items: ["secHttp1","secHttp2","secHttp3","secHttp4","secHttp5","secHttp6","secHttp7"] },
  ],

  techStack: [
    { layerKey: "techLang", techKey: "techLangV" },
    { layerKey: "techHttp", techKey: "techHttpV" },
    { layerKey: "techFe", techKey: "techFeV" },
    { layerKey: "techDb", techKey: "techDbV" },
    { layerKey: "techWs", techKey: "techWsV" },
    { layerKey: "techPeer", techKey: "techPeerV" },
    { layerKey: "techCrypto", techKey: "techCryptoV" },
  ],

  codeMetrics: [
    { labelKey: "metGoFiles", value: "255" },
    { labelKey: "metGoTests", value: "52" },
    { labelKey: "metGoLoc", value: "91,275" },
    { labelKey: "metTsFiles", value: "945" },
    { labelKey: "metTsLoc", value: "236,472" },
    { labelKey: "metTotal", value: "327,747" },
    { labelKey: "metApis", value: "256" },
    { labelKey: "metModels", value: "257" },
    { labelKey: "metWsEvents", value: "19" },
    { labelKey: "metMiddleware", value: "12" },
    { labelKey: "metFeModules", value: "9" },
  ],

  platforms: [
    { platformKey: "platMac", formatKey: "platMacFmt", archKey: "platMacArch" },
    { platformKey: "platMacNotary", formatKey: "platMacNotaryFmt", archKey: "platMacNotaryArch" },
    { platformKey: "platWin", formatKey: "platWinFmt", archKey: "platWinArch" },
    { platformKey: "platLinux", formatKey: "platLinuxFmt", archKey: "platLinuxArch" },
    { platformKey: "platMobile", formatKey: "platMobileFmt", archKey: "platMobileArch" },
  ],

  deployModel: [
    { labelKey: "depServer", saasKey: "depSaasServer", vchatKey: "depVchatServer" },
    { labelKey: "depCost", saasKey: "depSaasCost", vchatKey: "depVchatCost" },
    { labelKey: "depInternet", saasKey: "depSaasInternet", vchatKey: "depVchatInternet" },
    { labelKey: "depData", saasKey: "depSaasData", vchatKey: "depVchatData" },
    { labelKey: "depUptime", saasKey: "depSaasUptime", vchatKey: "depVchatUptime" },
    { labelKey: "depExport", saasKey: "depSaasExport", vchatKey: "depVchatExport" },
  ],

  idealSegments: [
    { icon: "🏪", titleKey: "idealRetail", descKey: "idealRetailDesc" },
    { icon: "🍜", titleKey: "idealFnb", descKey: "idealFnbDesc" },
    { icon: "🏭", titleKey: "idealMfg", descKey: "idealMfgDesc" },
    { icon: "🏢", titleKey: "idealSme", descKey: "idealSmeDesc" },
    { icon: "🏥", titleKey: "idealClinic", descKey: "idealClinicDesc" },
    { icon: "🌾", titleKey: "idealRural", descKey: "idealRuralDesc" },
  ],

  competitive: [
    { featureKey: "compInternet", vchatKey: "compVNo", cloudPosKey: "compYes", erpKey: "compYes" },
    { featureKey: "compFees", vchatKey: "compNone", cloudPosKey: "comp30_200", erpKey: "comp500plus" },
    { featureKey: "compDataLoc", vchatKey: "compOnPrem", cloudPosKey: "compCloudVendor", erpKey: "compCloudHybrid" },
    { featureKey: "compMultiMod", vchatKey: "comp9Integrated", cloudPosKey: "comp1_2", erpKey: "compManyComplex" },
    { featureKey: "compSetup", vchatKey: "compMinutes", cloudPosKey: "compHours", erpKey: "compWeeksMonths" },
    { featureKey: "compSync", vchatKey: "compLanP2p", cloudPosKey: "compCloudSync", erpKey: "compCloudSync" },
    { featureKey: "compOffline", vchatKey: "compFullOffline", cloudPosKey: "compLimited", erpKey: "compLimited" },
    { featureKey: "compVnStd", vchatKey: "compTT", cloudPosKey: "compPartial", erpKey: "compVaries" },
    { featureKey: "compChatBuiltin", vchatKey: "compYesBuiltin", cloudPosKey: "compNo", erpKey: "compSeparate" },
    { featureKey: "compVoiceVideo", vchatKey: "compWebrtc", cloudPosKey: "compNo", erpKey: "compNo" },
  ],

  compliance: ["compl1","compl2","compl3","compl4","compl5"],

  oneLiners: [
    { labelKey: "olTagline", textKey: "olTaglineText" },
    { labelKey: "olSeo", textKey: "olSeoText" },
    { labelKey: "olSocial", textKey: "olSocialText" },
    { labelKey: "olTech", textKey: "olTechText" },
  ],
});
