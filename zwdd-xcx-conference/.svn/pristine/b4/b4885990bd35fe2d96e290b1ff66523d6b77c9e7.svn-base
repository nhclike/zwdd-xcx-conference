export interface SetNavigationBarOptions {
    /**
     * 导航栏标题
     */
    title?: string;
    /**
     * 图片连接地址，必须是https，请使用3x高清图片。若设置了image则title参数失效
     */
    image?: string;
    /**
     * 导航栏背景色，支持十六进制颜色值
     */
    backgroundColor?: string;
    /**
     * 导航栏底部边框颜色，支持十六进制颜色值。若设置了 backgroundColor，则borderBottomColor 不会生效，默认会和 backgroundColor 颜色一样
     */
    borderBottomColor?: string;
    /**
     * 是否重置导航栏为默认配色，默认 false
     */
    reset?: boolean;
    complete?(): void;
}
export default interface Ui {
    showToast(options?: {
        content?: string;
        type?: 'none' | 'success' | 'fail' | 'exception';
        duration: null;
        complete?(): void;
    }): Promise<void>;
    hideToast(): Promise<void>;
    hideKeyboard(): void;
    pageScrollTo(options: {
        scrollTop: number;
    }): void;
    /**
     * 保留当前页面，跳转到应用内的某个指定页面，可以使用 my.navigateBack 返回到原来页面。
     * 注意：页面最大深度为10，即可连续调用 10 次 navigateTo
     */
    navigateTo(options: {
        /**
         * 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数。
         * 参数规则如下：路径与参数之间使用?分隔，参数键与参数值用=相连，不同参数必须用&分隔；
         * 如 path?key1=value1&key2=value2
         */
        url: string;
        complete?(): void;
    }): Promise<void>;
    /**
     * 关闭当前页面，跳转到应用内的某个指定页面。
     */
    redirectTo(options: {
        /**
         * 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数。
         * 参数规则如下：路径与参数之间使用?分隔，参数键与参数值用=相连，不同参数必须用&分隔；
         * 如 path?key1=value1&key2=value2
         */
        url: string;
        complete?(): void;
    }): Promise<void>;
    /**
     * 关闭当前页面，返回上一级或多级页面。可通过 getCurrentPages 获取当前的页面栈信息，决定需要返回几层。
     */
    navigateBack(options?: {
        /**
         * 返回的页面数，如果 delta 大于现有打开的页面数，则返回到首页
         */
        delta?: number;
    }): Promise<void>;
    /**
     * 关闭当前所有页面，跳转到应用内的某个指定页面。
     * 基础库 1.4.0+ & 支付宝客户端 10.1.8+ 支持
     */
    reLaunch(options: {
        /**
         * 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数。
         * 参数规则如下：路径与参数之间使用?分隔，参数键与参数值用=相连，不同参数必须用&分隔；
         * 如 path?key1=value1&key2=value2
         */
        url: string;
        complete?(): void;
    }): Promise<void>;
    setNavigationBar(options: SetNavigationBarOptions): void;
    switchTab(options: {
        url: string;
        complete?(): void;
    }): void;
}
