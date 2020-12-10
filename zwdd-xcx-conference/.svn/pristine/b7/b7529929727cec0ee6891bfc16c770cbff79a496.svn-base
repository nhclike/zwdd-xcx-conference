export interface GetImageInfoSuccessResult {
    /**
     * 图片宽度，单位px
     */
    readonly width: number;
    /**
     * 图片高度 单位px
     */
    readonly height: number;
    /**
     * 图片本地路径
     */
    readonly path: string;
    /**
     * 返回图片的方向
     *
     * - up：默认
     * - down：180度旋转
     * - left：逆时针旋转90度
     * - right：顺时针旋转90度
     * - up-mirrored：同up，但水平翻转
     * - down-mirrored：同down，但水平翻转
     * - left-mirrored：同left，但垂直翻转
     * - right-mirrored：同right，但垂直翻转
     */
    readonly orientation: 'up' | 'down' | 'left' | 'right' | 'up-mirrored' | 'down-mirrored' | 'left-mirrored' | 'right-mirrored';
    /**
     * 返回图片的格式
     */
    readonly type: string;
}
export interface GetImageInfoOptions {
    /**
     * 图片的路径，可以是相对路径，临时文件路径，存储文件路径
     */
    src: string;
    complete?(): void;
}
/**
 * 调用失败
 *
 * - 2：参数无效，没有传 url 参数
 * - 15：没有开启相册权限(ios only)
 * - 16：手机相册存储空间不足(ios only)
 * - 17：保存图片过程中的其他错误
 */
export interface SaveImageOptions {
    /**
     * 要保存的图片链接
     */
    url: string;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(): void;
}
export interface CompressImageOptions {
    /**
     * 要压缩的图片地址数组
     */
    apFilePaths: string[];
    /**
     * 压缩级别，支持 0 ~ 4 的整数，默认 4。
     *
     * - 0：低质量
     * - 1：中等质量
     * - 2：高质量
     * - 3：不压缩
     * - 4：根据网络适应
     */
    compressLevel: 0 | 1 | 2 | 3 | 4;
    complete?(): void;
}
export default interface Media {
    getImageInfo(options: GetImageInfoOptions): Promise<GetImageInfoSuccessResult>;
    saveImage(options: SaveImageOptions): Promise<void>;
    compressImage(options: CompressImageOptions): Promise<void>;
}
