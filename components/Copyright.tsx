import { HTMLAttributes } from "react";

export const CopyRight = (props: HTMLAttributes<HTMLDivElement>) => <div className={`text-center h-12 flex flex-col items-center justify-center ${props.className ?? ''}`}>
    <div>&copy; Ojarh Global</div>
</div>