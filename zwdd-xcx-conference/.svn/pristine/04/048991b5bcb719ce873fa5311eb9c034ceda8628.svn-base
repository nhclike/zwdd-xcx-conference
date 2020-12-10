interface GetWaterMarkConfigParams {
    pageInfo: string;
}
declare enum TargetPageConfigEnum {
    off = "0",
    on = "1"
}
declare enum WatermarkStatusEnum {
    off = 0,
    on = 1
}
declare enum ContentType {
    name = 1,
    id = 2,
    custom = 3
}
interface TargetPage {
    name: string;
    value: TargetPageConfigEnum;
}
interface CommonConfig {
    userName?: string;
    account?: string;
    watermarkStatus?: WatermarkStatusEnum | TargetPageConfigEnum;
    targetPages?: TargetPage[];
    contentType?: ContentType[];
    contentCustom?: string;
    fontStyle?: number | string;
    fontSize?: number | string;
    watermarkShowDensity?: number | string;
    fontColor?: number | string;
    fontDiaphaneity?: string;
}
export interface Config extends CommonConfig {
    watermark?: CommonConfig;
}
export default function getWaterMarkConfig(args: GetWaterMarkConfigParams): Promise<Config>;
export {};
