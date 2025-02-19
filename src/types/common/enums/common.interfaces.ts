export interface ItemsWithCount<T> {
    count: number
    items: T[]
}
export interface CommonEntityFields {
    _id: string
    createdAt: string
    updatedAt: string
}

export interface CategoryAppearance {
    icon: string
    color: string
}

export interface Faq {
    id?: string
    question: string
    answer: string
}
export interface OutletContext {
    pageRef: React.RefObject<HTMLDivElement> | null
}

export interface Breakpoints {
    isDesktop: boolean
    isLaptopAndAbove: boolean
    isLaptop: boolean
    isTablet: boolean
    isMobile: boolean
}
export interface RouteItem {
    route: string
    path: string
}

export interface AddDocuments {
    maxFileSize: number
    maxAllFilesSize: number
    filesTypes: string[]
    fileSizeError: string
    allFilesSizeError: string
    typeError: string
    maxQuantityFiles: number
    quantityError: string
    maxFileNameLength: number
    maxFileNameError: string
}

declare global {
    export interface File {
        src?: string
    }
}

