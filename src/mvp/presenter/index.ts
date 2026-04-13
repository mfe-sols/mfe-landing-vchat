import { tr } from "../../i18n/domain-messages";
import type { LandingModel } from "../model";

/* ── Presenter → ViewModel ────────────────────────────── */

export type StatVM = { label: string; value: string };

export type ModuleVM = {
  title: string;
  desc: string;
  icon: string;
  highlights: string[];
};

export type ArchBlockVM = { title: string; desc: string; items: string[] };

export type SecurityLayerVM = { title: string; items: string[] };

export type TechRowVM = { layer: string; tech: string };

export type MetricVM = { label: string; value: string };

export type PlatformRowVM = { platform: string; format: string; arch: string };

export type DeployRowVM = { label: string; saas: string; vchat: string };

export type IdealSegmentVM = { icon: string; title: string; desc: string };

export type CompetitiveRowVM = {
  feature: string;
  vchat: string;
  cloudPos: string;
  erp: string;
};

export type OneLinerVM = { label: string; text: string };

export type LandingViewModel = {
  heroEyebrow: string;
  heroTitle: string;
  heroSub: string;
  primaryCta: string;
  secondaryCta: string;
  heroStats: StatVM[];

  overviewTitle: string;
  overviewBody: string;
  overviewTarget: string;

  modulesEyebrow: string;
  modulesTitle: string;
  modules: ModuleVM[];

  archEyebrow: string;
  archTitle: string;
  archBlocks: ArchBlockVM[];

  secEyebrow: string;
  secTitle: string;
  secLayers: SecurityLayerVM[];

  techEyebrow: string;
  techTitle: string;
  techColLayer: string;
  techColTech: string;
  techStack: TechRowVM[];

  metricsTitle: string;
  codeMetrics: MetricVM[];

  platformTitle: string;
  platColPlatform: string;
  platColFormat: string;
  platColArch: string;
  platforms: PlatformRowVM[];

  deployEyebrow: string;
  deployTitle: string;
  deployColSaas: string;
  deployModel: DeployRowVM[];
  deployTagline: string;

  compTitle: string;
  compColFeature: string;
  compColCloud: string;
  compColErp: string;
  competitive: CompetitiveRowVM[];

  idealEyebrow: string;
  idealTitle: string;
  idealSegments: IdealSegmentVM[];

  complianceEyebrow: string;
  complianceTitle: string;
  compliance: string[];

  oneLiners: OneLinerVM[];

  footerTagline: string;
  footerTech: string;
};

export const createPresenter = (m: LandingModel): LandingViewModel => ({
  heroEyebrow: tr("heroEyebrow"),
  heroTitle: tr("heroTitle"),
  heroSub: tr("heroSub"),
  primaryCta: tr("primaryCta"),
  secondaryCta: tr("secondaryCta"),
  heroStats: m.heroStats.map((s) => ({ label: tr(s.labelKey), value: s.value })),

  overviewTitle: tr("overviewTitle"),
  overviewBody: tr("overviewBody"),
  overviewTarget: tr("overviewTarget"),

  modulesEyebrow: tr("modulesEyebrow"),
  modulesTitle: tr("modulesTitle"),
  modules: m.modules.map((mod) => ({
    title: tr(mod.titleKey),
    desc: tr(mod.descKey),
    icon: mod.iconKey,
    highlights: mod.highlights.map(tr),
  })),

  archEyebrow: tr("archEyebrow"),
  archTitle: tr("archTitle"),
  archBlocks: m.archBlocks.map((b) => ({
    title: tr(b.titleKey),
    desc: tr(b.descKey),
    items: b.items.map(tr),
  })),

  secEyebrow: tr("secEyebrow"),
  secTitle: tr("secTitle"),
  secLayers: m.secLayers.map((l) => ({
    title: tr(l.titleKey),
    items: l.items.map(tr),
  })),

  techEyebrow: tr("techEyebrow"),
  techTitle: tr("techTitle"),
  techColLayer: tr("techColLayer"),
  techColTech: tr("techColTech"),
  techStack: m.techStack.map((r) => ({
    layer: tr(r.layerKey),
    tech: tr(r.techKey),
  })),

  metricsTitle: tr("metricsTitle"),
  codeMetrics: m.codeMetrics.map((met) => ({
    label: tr(met.labelKey),
    value: met.value,
  })),

  platformTitle: tr("platformTitle"),
  platColPlatform: tr("platColPlatform"),
  platColFormat: tr("platColFormat"),
  platColArch: tr("platColArch"),
  platforms: m.platforms.map((p) => ({
    platform: tr(p.platformKey),
    format: tr(p.formatKey),
    arch: tr(p.archKey),
  })),

  deployEyebrow: tr("deployEyebrow"),
  deployTitle: tr("deployTitle"),
  deployColSaas: tr("deployColSaas"),
  deployModel: m.deployModel.map((d) => ({
    label: tr(d.labelKey),
    saas: tr(d.saasKey),
    vchat: tr(d.vchatKey),
  })),
  deployTagline: tr("deployTagline"),

  compTitle: tr("compTitle"),
  compColFeature: tr("compColFeature"),
  compColCloud: tr("compColCloud"),
  compColErp: tr("compColErp"),
  competitive: m.competitive.map((c) => ({
    feature: tr(c.featureKey),
    vchat: tr(c.vchatKey),
    cloudPos: tr(c.cloudPosKey),
    erp: tr(c.erpKey),
  })),

  idealEyebrow: tr("idealEyebrow"),
  idealTitle: tr("idealTitle"),
  idealSegments: m.idealSegments.map((seg) => ({
    icon: seg.icon,
    title: tr(seg.titleKey),
    desc: tr(seg.descKey),
  })),

  complianceEyebrow: tr("complianceEyebrow"),
  complianceTitle: tr("complianceTitle"),
  compliance: m.compliance.map(tr),

  oneLiners: m.oneLiners.map((o) => ({
    label: tr(o.labelKey),
    text: tr(o.textKey),
  })),

  footerTagline: tr("footerTagline"),
  footerTech: tr("footerTech"),
});
