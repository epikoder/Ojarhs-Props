import { HTMLAttributes } from "react";

export const CopyRight = (props: HTMLAttributes<HTMLDivElement>) => <div className={`text-center text-sm h-12 flex flex-col items-center justify-center ${props.className ?? ''}`}
    style={{
        fontFamily: 'space grotesk'
    }}>
    <div>&copy; Copyright. Ojarh Global</div>
</div>