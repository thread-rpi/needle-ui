import React, { useState } from "react";

import ClosedRecentlyButton from "./ClosedRecently"
import OpenRecentlyButton from "./OpenRecently";

type Props = {
  onLoopTapClick: () => void;
};

export default function ParentComponent({ onLoopTapClick }: Props) {

    const [showClosedRecently, setShowClosedRecently] = useState(true);


    const handleOpenRecently = () => {
        setShowClosedRecently(false);
        onLoopTapClick();  
    }

    return (
        <div>
            {showClosedRecently && <ClosedRecentlyButton onClick = {handleOpenRecently}/>}
            {!showClosedRecently && <OpenRecentlyButton/>}
        </div>
    )
}