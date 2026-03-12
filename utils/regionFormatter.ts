const REGION_MAP = {
    IN: "INDIAN",

    MY: "MALAYSIA",
    INDO: "INDONESIA",
    ID: "INDONESIA",
    TH: "THAILAND",
    VN: "VIETNAM",
    PH: "PHILIPPINES",
    BR: "BRAZIL",
    SG: "SINGAPORE",
    RU: "RUSSIA",
    MM: "MYANMAR",
    // Add more mappings here in the future
};

export function formatRegion(regionCode: string | undefined | null): string {
    if (!regionCode) return "N/A";
    const upperCode = regionCode.toUpperCase();
    return REGION_MAP[upperCode as keyof typeof REGION_MAP] || upperCode;
}
