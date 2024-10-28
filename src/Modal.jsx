
export default function Modal({activeModal, setActiveModal, children}){
    
    return(
        <div className={activeModal ? "modal active" : "modal"} onClick={()=>setActiveModal(false)}>
            <div className={activeModal ? "modal-content active" : "modal-content"} onClick={e=>e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}