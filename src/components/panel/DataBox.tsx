type Props = {
    loading?: boolean,
    title: string,
    count: number,
    theme?: string
}

export default function DataBox({ loading = false, title, count, theme = 'default' }: Props) {
    return (
        <div className="w-full min-[360px]:w-2/4 min-[850px]:w-1/4 flex items-center justify-start min-[360px]:justify-center min-[500px]:justify-start min-[850px]:justify-center flex-row min-[360px]:flex-col min-[500px]:flex-row gap-3">
            <div className={`size-[48px] flex items-center justify-center rounded-full ${theme == 'default' && 'bg-[#f1f3ff]'} ${theme == 'success' && 'bg-[#00c07318]'} ${theme == 'error' && 'bg-[#ed19431a]'} ${theme == 'orange' && 'bg-[#ff990021]'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512"
                    height="512" className={`size-[25px] transform-[translateY(-1px)]  ${theme == 'default' && 'fill-[#4a6dff]'} ${theme == 'success' && 'fill-[#00c073]'} ${theme == 'error' && 'fill-[#ed1943]'} ${theme == 'orange' && 'fill-[#ff9900]'}`}>
                    <path
                        d="M23.61,10.836l-1.718-3.592c-.218-.455-.742-.678-1.219-.517l-8.677,2.896L3.307,6.728c-.477-.159-1.001,.062-1.219,.518L.436,10.719c-.477,.792-.567,1.743-.247,2.609,.31,.84,.964,1.491,1.801,1.795l-.006,2.315c0,2.157,1.373,4.065,3.419,4.747l4.365,1.456c.714,.237,1.464,.356,2.214,.356s1.5-.119,2.214-.357l4.369-1.456c2.044-.682,3.418-2.586,3.419-4.738l.006-2.322c.846-.296,1.508-.945,1.819-1.788,.316-.858,.228-1.8-.198-2.5Zm-21.416,.83l1.318-2.763,7.065,2.354-1.62,3.256c-.242,.406-.729,.584-1.174,.436l-5.081-1.695c-.298-.099-.53-.324-.639-.618-.108-.293-.078-.616,.13-.97Zm3.842,8.623c-1.228-.41-2.053-1.555-2.052-2.848l.004-1.65,3.164,1.055c1.346,.446,2.793-.09,3.559-1.372l.277-.555-.004,6.979c-.197-.04-.391-.091-.582-.154l-4.365-1.455Zm11.896-.002l-4.369,1.456c-.19,.063-.384,.115-.58,.155l.004-6.995,.319,.64c.557,.928,1.532,1.46,2.562,1.46,.318,0,.643-.051,.96-.157l3.16-1.053-.004,1.651c0,1.292-.825,2.435-2.052,2.844Zm4-7.645c-.105,.285-.331,.504-.619,.601l-5.118,1.705c-.438,.147-.935-.036-1.136-.365l-1.654-3.322,7.064-2.357,1.382,2.88c.156,.261,.187,.574,.081,.859ZM5.214,5.896c-.391-.391-.391-1.023,0-1.414L9.111,.586c.779-.779,2.049-.779,2.828,0l1.596,1.596c.753-.385,1.738-.27,2.353,.345l2.255,2.255c.391,.391,.391,1.023,0,1.414s-1.023,.391-1.414,0l-2.255-2.255-3.151,3.151c-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l2.147-2.147-1.53-1.53-3.897,3.896c-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293Z" />
                </svg>
            </div >
            <div className="flex items-start justify-center flex-col min-[360px]:items-center min-[500px]:items-start">
                <p className="text-gray-400 text-[14px] font-medium -mb-1">{title}</p>
                {
                    !loading ? (
                        <span className="text-title font-heavy text-[19px]">{count}</span>
                    ) : (
                        <span className="w-[45px] h-[13px] rounded-full bg-gray-200 animation-pluse mt-[10px]"></span>
                    )
                }
            </div>
        </div>
    )
}