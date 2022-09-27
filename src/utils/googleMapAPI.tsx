import React, { useState, useEffect, useRef, SetStateAction } from 'react'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    Circle,
} from "@react-google-maps/api"
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import useReactRouter from 'use-react-router';
import { Typography, makeStyles, Grid, Box, Button, ListItemAvatar, Avatar, List } from '@material-ui/core'
const TabChatOff = require('../assets/TabChatOff.png');
const TabMapOn = require('../assets/TabMapOn.png');

const baseFontColor = '#4575b4';
const useStyles = makeStyles((theme) => ({

    bottomTab: {
        position: "fixed",
        bottom: "0",
        height: "10%",
        width: "100%",
        backgroundColor: "#eeedea",
        display: "flex",
        flexDirection: "row",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    bottomChat: {
        // border: "2px solid",
        // borderColor: "pink",
        flex: 1,
    },
    bottomMap: {
        // border: "2px solid",
        // borderColor: "pink",
        flex: 1,
    },
    mapWrapper: {
        width: "100%",
        hight: "100%",
        position: "fixed",
        // borderRadius: "50%",
        // backgroundColor: "blue",
        // zIndex:100,
        // marginLeft: "40%",
        // fontFamily: 'メイリオ',
        // cursor: "pointer",
    },
    checkIn: {
        position: "fixed",
        bottom: "15%",
        left: "33%",
        color: '#ffffff',
        backgroundColor: baseFontColor,
    }
}))
const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
};



const options = {
    disableDefaultUI: true,
    zoomControl: true
};

const BottomTab: React.FC = () => {
    const { history } = useReactRouter();
    const classes = useStyles()
    return (

        <div className={classes.bottomTab}>
            <div className={classes.bottomChat}>

                <img src={TabChatOff} onClick={() => history.push("/chat")} />
                <div>
                    チャット
                </div>
            </div>
            <div className={classes.bottomMap} >

                <img src={TabMapOn} />
                <div>
                    マップ
                </div>
            </div>
        </div>
    )
}

const libraries: Libraries = ["places", "geometry"]

const GoogleMapAPI: React.FC<{ a: string }> = (props) => {
    const [centerLat, setCenterLat] = useState(35.681215917748915)
    const [centerLng, setCenterLng] = useState(139.76707964692983)
    const center = {
        lat: centerLat,
        lng: centerLng,
    };
    const [tokyoShow, setTokyoShow] = useState(false)
    const [oyaShow, setOyaShow] = useState(false)
    const [oyaderaShow, setOyaderaShow] = useState(false)
    const [kurirujuShow, setKurirujuShow] = useState(false)
    const [mogamijayaShow, setMogamijayaShow] = useState(false)
    const [utsunomiyaZooShow, setUtsunomiyaZooShow] = useState(false)
    const [wakatakeShow, setWakatakeShow] = useState(false)
    const [utsunomiyaParkShow, setUtsunomiyaParkShow] = useState(false)
    const [kurasseShow, setKurasseShow] = useState(false)
    const [utsunomiyaTowerShow, setUtsunomiyaTowerShow] = useState(false)
    const [selectCafeShow, setSelectCafeShow] = useState(false)
    const [futarayamaShow, setFutarayamaShow] = useState(false)
    const classes = useStyles()

    useEffect(() => {
        const jwt = JSON.parse(localStorage.getItem('jwt') as string)
        const { Authorization, Accesstoken } = jwt
        // const scenarioHist: Array<{ nextSentenceId: string, personName: string, plane: string }> = JSON.parse(localStorage.getItem('scenarioHist') as string)

        const scenarioHistString: string | null = localStorage.getItem('scenarioHist')
        // const scenarioHist: string<{ nextSentenceId: string, personName: string, plane: string }> = localStorage.getItem('scenarioHist')
        // const { personName, plane } = scenarioHist

        console.log(scenarioHistString)
        if (scenarioHistString) {
            console.log("Localstorage")
            const scenarioHist: Array<{ nextSentenceId: string, personName: string, plane: string }> = JSON.parse(scenarioHistString)
            if (scenarioHist.length > 0) {
                if ((scenarioHist.slice(-1)[0].nextSentenceId === "5")) {
                    setTokyoShow(true)
                    setCenterLat(35.681215917748915)
                    setCenterLng(139.76707964692983)
                }
                if ((scenarioHist.slice(-1)[0].nextSentenceId === "68")) {
                    setOyaShow(true)
                    setCenterLat(36.5999734)
                    setCenterLng(139.824739)
                }
                if ((scenarioHist.slice(-1)[0].nextSentenceId === "125")) {
                    setKurirujuShow(true)
                    setCenterLat(36.631208)
                    setCenterLng(139.827650)
                }
                if ((scenarioHist.slice(-1)[0].nextSentenceId === "165")) {
                    setWakatakeShow(true)
                    setCenterLat(36.6162505)
                    setCenterLng(139.8501882)
                }
                if ((scenarioHist.slice(-1)[0].nextSentenceId === "216")) {
                    setFutarayamaShow(true)
                    setCenterLat(36.5621935)
                    setCenterLng(139.8858675)
                }
                if ((scenarioHist.slice(-1)[0].nextSentenceId === "308")) {
                    setUtsunomiyaTowerShow(true)
                    setCenterLat(36.5715866)
                    setCenterLng(139.8876343)
                }
                if ((scenarioHist.slice(-1)[0].nextSentenceId === "410")) {
                    setUtsunomiyaZooShow(true)
                    setCenterLat(36.6328899)
                    setCenterLng(139.8532834)
                }
                if ((scenarioHist.slice(-1)[0].nextSentenceId === "464")) {
                    setKurasseShow(true)
                    setCenterLat(36.5611947)
                    setCenterLng(139.8854799)
                }
                if ((scenarioHist.slice(-1)[0].nextSentenceId === "546")) {
                    setSelectCafeShow(true)
                    setCenterLat(36.559957)
                    setCenterLng(139.9022182)
                }
                if ((scenarioHist.slice(-1)[0].nextSentenceId === "625")) {
                    setMogamijayaShow(true)
                    setCenterLat(36.617913)
                    setCenterLng(139.820958)
                }
                if ((scenarioHist.slice(-1)[0].nextSentenceId === "672")) {
                    setUtsunomiyaParkShow(true)
                    setCenterLat(36.61892)
                    setCenterLng(139.7901353)
                }
                if ((scenarioHist.slice(-1)[0].nextSentenceId === "730")) {
                    setOyaderaShow(true)
                    setCenterLat(36.5962531)
                    setCenterLng(139.8206917)
                }
            }

        } else {
            console.log("DB")

            //id削除
            fetch("https://jtb-prd.two-choices.jp/api/scenario/log/", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authorization,
                    'accesstoken': Accesstoken
                },
            }).then(res => res.json()).then(data => {
                if (data.scenarioHistory.length <= 0) {

                    localStorage.setItem('scenarioHist', JSON.stringify([]))
                    return
                }
                const localHistory = localStorage.setItem('scenarioHist', JSON.stringify(data.ScenarioHistory))
                const scenarioGet: Array<{ nextSentenceId: string, personName: string, plane: string }> = JSON.parse(localStorage.getItem('scenarioHist') as string)
                console.log(scenarioGet)
            })
        }
    }, [])
    const [position, setPosition] = useState<{ latitude: number, longitude: number }>();
    //-----------------------------------------------------------
    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey,
        libraries: libraries,
    });

    if (loadError) return <h1>"Error loading maps"</h1>//returnあとにusestate入れるとだめ
    if (!isLoaded) return <h1>Loading maps</h1>
    //-----------------------------------------------------------

    //-----------------------------------------------------------
    // const utsunomiya = new google.maps.LatLng(36.559707, 139.898472) //宇都宮駅
    // const utsunomiya = new google.maps.LatLng(35.75098387956675, 139.7615640423288) //小台
    const utsunomiya = new google.maps.LatLng(36.2048239999999995, 138.252924) //PC
    const tokyo = new google.maps.LatLng(35.681215917748915, 139.76707964692983) //東京駅
    const oyashiryokan = new google.maps.LatLng(36.5999734, 139.824739) //大谷資料館
    const oyadera = new google.maps.LatLng(36.5962531, 139.8206917) //大谷寺
    const kuriruju = new google.maps.LatLng(36.631208, 139.827650) //クーリ・ルージュ
    const mogamijaya = new google.maps.LatLng(36.617913, 139.820958) //最上茶屋
    const wakatake = new google.maps.LatLng(36.616712, 139.849803) //若竹の社
    const futarayama = new google.maps.LatLng(36.5621935, 139.8858675) //二荒山
    const utsunomiyaZoo = new google.maps.LatLng(36.632781, 139.853577) //宇都宮動物園
    const utsunomiyaPark = new google.maps.LatLng(36.61892, 139.7901353) //宇都宮森林公園
    const kurasse = new google.maps.LatLng(36.5611947, 139.8854799) //来らっせ
    const utsunomiyaTower = new google.maps.LatLng(36.5715866, 139.8876343) //宇都宮タワー
    const selectCafe = new google.maps.LatLng(36.559957, 139.9022182) //SELECT
    const test = new google.maps.LatLng(36.204823999, 138.272924) //テスト
    //-----------------------------------------------------------
    // const res = google.maps.geometry.spherical.computeDistanceBetween(oyasiryokan, utsunomiya) 
    // console.log(res)

    const tokyoArea = new google.maps.Circle({ //範囲情報
        strokeColor: '#FF0000',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.2,
        // map: map,
        center: tokyo,
        radius: 500
    });
    // const utsunomiyaArea = new google.maps.Circle({ //範囲情報
    //     strokeColor: '#FF0000',
    //     strokeOpacity: 0.5,
    //     strokeWeight: 2,
    //     fillColor: '#FF0000',
    //     fillOpacity: 0.2,
    //     // map: map,
    //     center: utsunomiya,
    //     radius: 100
    // });

    const oyashiryokanArea = new google.maps.Circle({ //範囲情報
        strokeColor: '#FF0000',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.2,
        // map: map,
        center: oyashiryokan,
        radius: 1000
    });
    const oyaderaArea = new google.maps.Circle({ //範囲情報
        strokeColor: '#FF0000',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.2,
        // map: map,
        center: oyadera,
        radius: 500
    });
    const kurirujuArea = new google.maps.Circle({ //範囲情報
        strokeColor: '#FF0000',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.2,
        // map: map,
        center: kuriruju,
        radius: 500
    });
    const mogamijayaArea = new google.maps.Circle({ //範囲情報
        strokeColor: '#FF0000',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.2,
        // map: map,
        center: mogamijaya,
        radius: 350
    });
    const wakatakeArea = new google.maps.Circle({ //範囲情報
        strokeColor: '#FF0000',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.2,
        // map: map,
        center: wakatake,
        radius: 500
    });
    const utsunomiyaZooArea = new google.maps.Circle({ //範囲情報
        strokeColor: '#FF0000',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.2,
        // map: map,
        center: utsunomiyaZoo,
        radius: 300
    });
    const utsunomiyaParkArea = new google.maps.Circle({ //範囲情報
        strokeColor: '#FF0000',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.2,
        // map: map,
        center: utsunomiyaPark,
        radius: 1000
    });
    const kurasseArea = new google.maps.Circle({ //範囲情報
        strokeColor: '#FF0000',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.2,
        // map: map,
        center: kurasse,
        radius: 350
    });
    const utsunomiyaTowerArea = new google.maps.Circle({ //範囲情報
        strokeColor: '#FF0000',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.2,
        // map: map,
        center: utsunomiyaTower,
        radius: 500
    });
    const selectCafeArea = new google.maps.Circle({ //範囲情報
        strokeColor: '#FF0000',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.2,
        // map: map,
        center: selectCafe,
        radius: 300
    });
    const futarayamaArea = new google.maps.Circle({ //範囲情報
        strokeColor: '#FF0000',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.2,
        // map: map,
        center: futarayama,
        radius: 500
    });
    const testArea = new google.maps.Circle({ //範囲情報
        strokeColor: '#FF0000',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.2,
        // map: map,
        center: test,
        radius: 100
    });



    //-----------------------------------------------------------

    function error(error: any) {
        var errorMessage: any = {
            0: "原因不明のエラーが発生しました…。",
            1: "位置情報の取得が許可されませんでした…。",
            2: "電波状況などで位置情報が取得できませんでした…。",
            3: "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。",
        };
        console.log(errorMessage[error.code]);//getccurentpotion
    }

    const getCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition((position: Position) => {
            var data = position.coords;
            var lat = data.latitude;
            var lng = data.longitude;
            var latlng = new google.maps.LatLng(lat, lng);

            setPosition({ latitude: lat, longitude: lng });

            setCenterLat(lat)
            setCenterLng(lng)
            var markerOptions = {
                // map: map,
                position: latlng,
                draggable: true,
                visible: true,
            }
            new google.maps.Marker(markerOptions);
            if (tokyoShow === true) {
                console.log("tokyo")
                //東京駅
                if (google.maps.geometry.spherical.computeDistanceBetween(latlng, tokyoArea.getCenter()) <= tokyoArea.getRadius()) { //領域判定
                    console.log("東京駅範囲内")

                    const jwt = JSON.parse(localStorage.getItem('jwt') as string)
                    const { Authorization, Accesstoken } = jwt
                    const scenarioHist: Array<{ nextSentenceId: string, personName: string, plane: string }> = JSON.parse(localStorage.getItem('scenarioHist') as string)
                    console.log("Localstorage")

                    const tmpArray = JSON.parse(localStorage.getItem('scenarioHist') as string)
                    console.log("tmpArray:", tmpArray)
                    tmpArray.push({ nextSentenceId: "6", personName: "ナレーター", plane: "チェックインできました。" })
                    // localStorage.setItem('scenarioHist', JSON.stringify({ personName: scenario.personName, plane: scenario.sentence.plane, nextSentenceId: scenario.nextSentenceId }))
                    localStorage.setItem('scenarioHist', JSON.stringify(tmpArray))
                    console.log("DB")

                    //ログから会話履歴をもってくる

                    fetch("https://jtb-prd.two-choices.jp/api/scenario/log/", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': Authorization,
                            'accesstoken': Accesstoken
                        },
                        // body: JSON.stringify({ scenario: { personName: scenario.personName, plane: scenario.sentence.plane, nextSentenceId: scenario.nextSentenceId } })
                        body: JSON.stringify({ scenario: { nextSentenceId: "6", personName: "ナレーター", plane: "チェックインできました。" } })
                    })
                    window.alert("チェックインできました。チャット画面に戻ってシナリオを進めてください。")
                } else {
                    console.log("東京駅範囲外")
                }
            }
            if (oyaShow === true) {

                //大谷資料館
                if (google.maps.geometry.spherical.computeDistanceBetween(latlng, oyashiryokanArea.getCenter()) <= oyashiryokanArea.getRadius()) { //領域判定
                    console.log("大谷資料館範囲内")
                    const jwt = JSON.parse(localStorage.getItem('jwt') as string)
                    const { Authorization, Accesstoken } = jwt
                    const scenarioHist: Array<{ nextSentenceId: string, personName: string, plane: string }> = JSON.parse(localStorage.getItem('scenarioHist') as string)
                    console.log("Localstorage")

                    const tmpArray = JSON.parse(localStorage.getItem('scenarioHist') as string)
                    console.log("tmpArray:", tmpArray)
                    tmpArray.push({ nextSentenceId: "69", personName: "ナレーター", plane: "チェックインできました。" })
                    // localStorage.setItem('scenarioHist', JSON.stringify({ personName: scenario.personName, plane: scenario.sentence.plane, nextSentenceId: scenario.nextSentenceId }))
                    localStorage.setItem('scenarioHist', JSON.stringify(tmpArray))
                    console.log("DB")

                    //ログから会話履歴をもってくる

                    fetch("https://jtb-prd.two-choices.jp/api/scenario/log/", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': Authorization,
                            'accesstoken': Accesstoken
                        },
                        // body: JSON.stringify({ scenario: { personName: scenario.personName, plane: scenario.sentence.plane, nextSentenceId: scenario.nextSentenceId } })
                        body: JSON.stringify({ scenario: { nextSentenceId: "69", personName: "ナレーター", plane: "チェックインできました。" } })
                    })
                    window.alert("チェックインできました。チャット画面に戻ってシナリオを進めてください。")
                    // alert("大谷資料館範囲内")
                } else {
                    console.log("大谷資料館範囲外")
                    window.alert("チェックインできませんでした。目的地付近に近づいて再度チェックインしてください")
                    // alert("大谷資料館範囲外")
                }
            }

            if (oyaderaShow === true) {
                //大谷寺
                if (google.maps.geometry.spherical.computeDistanceBetween(latlng, oyaderaArea.getCenter()) <= oyaderaArea.getRadius()) { //領域判定
                    console.log("二荒山範囲内")
                    const jwt = JSON.parse(localStorage.getItem('jwt') as string)
                    const { Authorization, Accesstoken } = jwt
                    const scenarioHist: Array<{ nextSentenceId: string, personName: string, plane: string }> = JSON.parse(localStorage.getItem('scenarioHist') as string)
                    console.log("Localstorage")

                    const tmpArray = JSON.parse(localStorage.getItem('scenarioHist') as string)
                    console.log("tmpArray:", tmpArray)
                    tmpArray.push({ nextSentenceId: "731", personName: "ナレーター", plane: "チェックインできました。" })
                    localStorage.setItem('scenarioHist', JSON.stringify(tmpArray))
                    console.log("DB")

                    //ログから会話履歴をもってくる

                    fetch("https://jtb-prd.two-choices.jp/api/scenario/log/", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': Authorization,
                            'accesstoken': Accesstoken
                        },
                        body: JSON.stringify({ scenario: { nextSentenceId: "731", personName: "ナレーター", plane: "チェックインできました。" } })
                    })
                    window.alert("チェックインできました。チャット画面に戻ってシナリオを進めてください。")
                    // alert("大谷寺範囲内")
                } else {
                    console.log("大谷寺範囲外")
                    window.alert("チェックインできませんでした。再度チェックインしてください。")
                    // alert("大谷寺範囲外")
                }
            }
            if (futarayamaShow === true) {
                //二荒山神社
                if (google.maps.geometry.spherical.computeDistanceBetween(latlng, futarayamaArea.getCenter()) <= futarayamaArea.getRadius()) { //領域判定
                    console.log("二荒山範囲内")
                    const jwt = JSON.parse(localStorage.getItem('jwt') as string)
                    const { Authorization, Accesstoken } = jwt
                    const scenarioHist: Array<{ nextSentenceId: string, personName: string, plane: string }> = JSON.parse(localStorage.getItem('scenarioHist') as string)
                    console.log("Localstorage")

                    const tmpArray = JSON.parse(localStorage.getItem('scenarioHist') as string)
                    console.log("tmpArray:", tmpArray)
                    tmpArray.push({ nextSentenceId: "217", personName: "ナレーター", plane: "チェックインできました。" })
                    localStorage.setItem('scenarioHist', JSON.stringify(tmpArray))
                    console.log("DB")

                    //ログから会話履歴をもってくる

                    fetch("https://jtb-prd.two-choices.jp/api/scenario/log/", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': Authorization,
                            'accesstoken': Accesstoken
                        },
                        body: JSON.stringify({ scenario: { nextSentenceId: "217", personName: "ナレーター", plane: "チェックインできました。" } })
                    })
                    window.alert("チェックインできました。チャット画面に戻ってシナリオを進めてください。")
                    
                    
                } else {
                    console.log("二荒山範囲外")
                    window.alert("チェックインできませんでした。再度チェックインしてください。")
                }
            }
            if (kurirujuShow === true) {
                //クーリ・ルージュ
                if (google.maps.geometry.spherical.computeDistanceBetween(latlng, kurirujuArea.getCenter()) <= kurirujuArea.getRadius()) { //領域判定
                    console.log("クーリ・ルージュ範囲内")
                    const jwt = JSON.parse(localStorage.getItem('jwt') as string)
                    const { Authorization, Accesstoken } = jwt
                    const scenarioHist: Array<{ nextSentenceId: string, personName: string, plane: string }> = JSON.parse(localStorage.getItem('scenarioHist') as string)
                    console.log("Localstorage")

                    const tmpArray = JSON.parse(localStorage.getItem('scenarioHist') as string)
                    console.log("tmpArray:", tmpArray)
                    tmpArray.push({ nextSentenceId: "126", personName: "ナレーター", plane: "チェックインできました。" })
                    // localStorage.setItem('scenarioHist', JSON.stringify({ personName: scenario.personName, plane: scenario.sentence.plane, nextSentenceId: scenario.nextSentenceId }))
                    localStorage.setItem('scenarioHist', JSON.stringify(tmpArray))
                    console.log("DB")

                    //ログから会話履歴をもってくる

                    fetch("https://jtb-prd.two-choices.jp/api/scenario/log/", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': Authorization,
                            'accesstoken': Accesstoken
                        },
                        // body: JSON.stringify({ scenario: { personName: scenario.personName, plane: scenario.sentence.plane, nextSentenceId: scenario.nextSentenceId } })
                        body: JSON.stringify({ scenario: { nextSentenceId: "126", personName: "ナレーター", plane: "チェックインできました。入店してシナリオを進めましょう" } })
                    })
                    window.alert("チェックインできました。チャット画面に戻ってシナリオを進めてください。")
                    // alert("クーリ・ルージュ範囲内")
                } else {
                    console.log("クーリ・ルージュ範囲外")
                    window.alert("チェックインできませんでした。再度チェックインしてください。")
                    // alert("クーリ・ルージュ範囲外")
                }
            }

            if (mogamijayaShow === true) {

                //最上茶屋
                if (google.maps.geometry.spherical.computeDistanceBetween(latlng, mogamijayaArea.getCenter()) <= mogamijayaArea.getRadius()) { //領域判定

                    const jwt = JSON.parse(localStorage.getItem('jwt') as string)
                    const { Authorization, Accesstoken } = jwt
                    const scenarioHist: Array<{ nextSentenceId: string, personName: string, plane: string }> = JSON.parse(localStorage.getItem('scenarioHist') as string)
                    console.log("Localstorage")

                    const tmpArray = JSON.parse(localStorage.getItem('scenarioHist') as string)
                    console.log("tmpArray:", tmpArray)
                    tmpArray.push({ nextSentenceId: "626", personName: "ナレーター", plane: "チェックインできました。" })
                    // localStorage.setItem('scenarioHist', JSON.stringify({ personName: scenario.personName, plane: scenario.sentence.plane, nextSentenceId: scenario.nextSentenceId }))
                    localStorage.setItem('scenarioHist', JSON.stringify(tmpArray))
                    console.log("DB")

                    //ログから会話履歴をもってくる

                    fetch("https://jtb-prd.two-choices.jp/api/scenario/log/", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': Authorization,
                            'accesstoken': Accesstoken
                        },
                        // body: JSON.stringify({ scenario: { personName: scenario.personName, plane: scenario.sentence.plane, nextSentenceId: scenario.nextSentenceId } })
                        body: JSON.stringify({ scenario: { nextSentenceId: "626", personName: "ナレーター", plane: "チェックインできました。入店してシナリオを進めましょう" } })
                    })
                    window.alert("チェックインできました。チャット画面に戻ってシナリオを進めてください。")
                    // alert("最上茶屋範囲内")
                } else {
                    console.log("最上茶屋範囲外")
                    window.alert("チェックインできませんでした。再度チェックインしてください。")
                    // alert("最上茶屋範囲外")
                }
            }

            if (wakatakeShow === true) {
                //若竹
                if (google.maps.geometry.spherical.computeDistanceBetween(latlng, wakatakeArea.getCenter()) <= wakatakeArea.getRadius()) { //領域判定
                    console.log("若竹範囲内")
                    const jwt = JSON.parse(localStorage.getItem('jwt') as string)
                    const { Authorization, Accesstoken } = jwt
                    const scenarioHist: Array<{ nextSentenceId: string, personName: string, plane: string }> = JSON.parse(localStorage.getItem('scenarioHist') as string)
                    console.log("Localstorage")

                    const tmpArray = JSON.parse(localStorage.getItem('scenarioHist') as string)
                    console.log("tmpArray:", tmpArray)
                    tmpArray.push({ nextSentenceId: "166", personName: "ナレーター", plane: "チェックインできました。" })
                    // localStorage.setItem('scenarioHist', JSON.stringify({ personName: scenario.personName, plane: scenario.sentence.plane, nextSentenceId: scenario.nextSentenceId }))
                    localStorage.setItem('scenarioHist', JSON.stringify(tmpArray))
                    console.log("DB")

                    //ログから会話履歴をもってくる

                    fetch("https://jtb-prd.two-choices.jp/api/scenario/log/", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': Authorization,
                            'accesstoken': Accesstoken
                        },
                        // body: JSON.stringify({ scenario: { personName: scenario.personName, plane: scenario.sentence.plane, nextSentenceId: scenario.nextSentenceId } })
                        body: JSON.stringify({ scenario: { nextSentenceId: "166", personName: "ナレーター", plane: "チェックインできました。" } })
                    })
                    window.alert("チェックインできました。チャット画面に戻ってシナリオを進めてください。")
                    // alert("大谷資料館範囲内")
                } else {
                    console.log("若竹範囲外")
                    window.alert("チェックインできませんでした。再度チェックインしてください。")
                    // alert("若竹範囲外")
                }
            }
            if(utsunomiyaParkShow===true){

                //公園
                if (google.maps.geometry.spherical.computeDistanceBetween(latlng, utsunomiyaParkArea.getCenter()) <= utsunomiyaParkArea.getRadius()) { //領域判定
                    const jwt = JSON.parse(localStorage.getItem('jwt') as string)
                    const { Authorization, Accesstoken } = jwt
                    const scenarioHist: Array<{ nextSentenceId: string, personName: string, plane: string }> = JSON.parse(localStorage.getItem('scenarioHist') as string)
                    console.log("Localstorage")

                    const tmpArray = JSON.parse(localStorage.getItem('scenarioHist') as string)
                    console.log("tmpArray:", tmpArray)
                    tmpArray.push({ nextSentenceId: "673", personName: "ナレーター", plane: "チェックインできました。" })
                    // localStorage.setItem('scenarioHist', JSON.stringify({ personName: scenario.personName, plane: scenario.sentence.plane, nextSentenceId: scenario.nextSentenceId }))
                    localStorage.setItem('scenarioHist', JSON.stringify(tmpArray))
                    console.log("DB")

                    //ログから会話履歴をもってくる

                    fetch("https://jtb-prd.two-choices.jp/api/scenario/log/", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': Authorization,
                            'accesstoken': Accesstoken
                        },
                        // body: JSON.stringify({ scenario: { personName: scenario.personName, plane: scenario.sentence.plane, nextSentenceId: scenario.nextSentenceId } })
                        body: JSON.stringify({ scenario: { nextSentenceId: "673", personName: "ナレーター", plane: "チェックインできました。シナリオを進めてください" } })
                    })
                    window.alert("チェックインできました。チャット画面に戻ってシナリオを進めてください。")
                    // alert("動物園範囲内")
                } else {
                    console.log("動物園範囲外")
                    window.alert("チェックインできませんでした。再度チェックインしてください。")
                    // alert("動物園範囲外")
                }
            }

            if(utsunomiyaZooShow===true){

                //動物園
                if (google.maps.geometry.spherical.computeDistanceBetween(latlng, utsunomiyaZooArea.getCenter()) <= utsunomiyaZooArea.getRadius()) { //領域判定
                    const jwt = JSON.parse(localStorage.getItem('jwt') as string)
                    const { Authorization, Accesstoken } = jwt
                    const scenarioHist: Array<{ nextSentenceId: string, personName: string, plane: string }> = JSON.parse(localStorage.getItem('scenarioHist') as string)
                    console.log("Localstorage")

                    const tmpArray = JSON.parse(localStorage.getItem('scenarioHist') as string)
                    console.log("tmpArray:", tmpArray)
                    tmpArray.push({ nextSentenceId: "411", personName: "ナレーター", plane: "チェックインできました。入園してシナリオを進めましょう" })
                    // localStorage.setItem('scenarioHist', JSON.stringify({ personName: scenario.personName, plane: scenario.sentence.plane, nextSentenceId: scenario.nextSentenceId }))
                    localStorage.setItem('scenarioHist', JSON.stringify(tmpArray))
                    console.log("DB")

                    //ログから会話履歴をもってくる

                    fetch("https://jtb-prd.two-choices.jp/api/scenario/log/", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': Authorization,
                            'accesstoken': Accesstoken
                        },
                        // body: JSON.stringify({ scenario: { personName: scenario.personName, plane: scenario.sentence.plane, nextSentenceId: scenario.nextSentenceId } })
                        body: JSON.stringify({ scenario: { nextSentenceId: "411", personName: "ナレーター", plane: "チェックインできました。入園してシナリオを進めましょう" } })
                    })
                    window.alert("チェックインできました。チャット画面に戻ってシナリオを進めてください。")
                    // alert("公園範囲内")
                } else {
                    console.log("公園範囲外")
                    window.alert("チェックインできませんでした。再度チェックインしてください。")
                    // alert("公園範囲外")
                }
            }

            if(kurasseShow===true){

                //くらっせ
                if (google.maps.geometry.spherical.computeDistanceBetween(latlng, kurasseArea.getCenter()) <= kurasseArea.getRadius()) { //領域判定
                    const jwt = JSON.parse(localStorage.getItem('jwt') as string)
                    const { Authorization, Accesstoken } = jwt
                    const scenarioHist: Array<{ nextSentenceId: string, personName: string, plane: string }> = JSON.parse(localStorage.getItem('scenarioHist') as string)
                    console.log("Localstorage")

                    const tmpArray = JSON.parse(localStorage.getItem('scenarioHist') as string)
                    console.log("tmpArray:", tmpArray)
                    tmpArray.push({ nextSentenceId: "465", personName: "ナレーター", plane: "チェックインできました。席についてシナリオを進めましょう" })
                    // localStorage.setItem('scenarioHist', JSON.stringify({ personName: scenario.personName, plane: scenario.sentence.plane, nextSentenceId: scenario.nextSentenceId }))
                    localStorage.setItem('scenarioHist', JSON.stringify(tmpArray))
                    console.log("DB")

                    //ログから会話履歴をもってくる

                    fetch("https://jtb-prd.two-choices.jp/api/scenario/log/", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': Authorization,
                            'accesstoken': Accesstoken
                        },
                        // body: JSON.stringify({ scenario: { personName: scenario.personName, plane: scenario.sentence.plane, nextSentenceId: scenario.nextSentenceId } })
                        body: JSON.stringify({ scenario: { nextSentenceId: "465", personName: "ナレーター", plane: "チェックインできました。席についてシナリオを進めましょう" } })
                    })
                    window.alert("チェックインできました。チャット画面に戻ってシナリオを進めてください。")
                    // alert("くらっせ範囲内")
                } else {
                    console.log("くらっせ範囲外")
                    window.alert("チェックインできませんでした。再度チェックインしてください。")
                    // alert("くらっせ範囲外")
                }
            }

            if(utsunomiyaTowerShow===true){

                //宇都宮タワー
                if (google.maps.geometry.spherical.computeDistanceBetween(latlng, utsunomiyaTowerArea.getCenter()) <= utsunomiyaTowerArea.getRadius()) { //領域判定
                        const jwt = JSON.parse(localStorage.getItem('jwt') as string)
                        const { Authorization, Accesstoken } = jwt
                        const scenarioHist: Array<{ nextSentenceId: string, personName: string, plane: string }> = JSON.parse(localStorage.getItem('scenarioHist') as string)
                        console.log("Localstorage")
    
                        const tmpArray = JSON.parse(localStorage.getItem('scenarioHist') as string)
                        console.log("tmpArray:", tmpArray)
                        tmpArray.push({ nextSentenceId: "309", personName: "ナレーター", plane: "チェックインできました。" })
                        // localStorage.setItem('scenarioHist', JSON.stringify({ personName: scenario.personName, plane: scenario.sentence.plane, nextSentenceId: scenario.nextSentenceId }))
                        localStorage.setItem('scenarioHist', JSON.stringify(tmpArray))
                        console.log("DB")
    
                        //ログから会話履歴をもってくる
    
                        fetch("https://jtb-prd.two-choices.jp/api/scenario/log/", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': Authorization,
                                'accesstoken': Accesstoken
                            },
                            // body: JSON.stringify({ scenario: { personName: scenario.personName, plane: scenario.sentence.plane, nextSentenceId: scenario.nextSentenceId } })
                            body: JSON.stringify({ scenario: { nextSentenceId: "309", personName: "ナレーター", plane: "チェックインできました。" } })
                        })
                        window.alert("チェックインできました。チャット画面に戻ってシナリオを進めてください。")
                        // alert("大谷資料館範囲内")
                } else {
                    console.log("宇都宮タワー範囲外")
                    window.alert("チェックインできませんでした。再度チェックインしてください。")
                    // alert("宇都宮タワー範囲外")
                }
            }
            if(selectCafeShow===true){

                //SELECT
                if (google.maps.geometry.spherical.computeDistanceBetween(latlng, selectCafeArea.getCenter()) <= selectCafeArea.getRadius()) { //領域判定
                    const jwt = JSON.parse(localStorage.getItem('jwt') as string)
                    const { Authorization, Accesstoken } = jwt
                    const scenarioHist: Array<{ nextSentenceId: string, personName: string, plane: string }> = JSON.parse(localStorage.getItem('scenarioHist') as string)
                    console.log("Localstorage")

                    const tmpArray = JSON.parse(localStorage.getItem('scenarioHist') as string)
                    console.log("tmpArray:", tmpArray)
                    tmpArray.push({ nextSentenceId: "547", personName: "ナレーター", plane: "チェックインできました。席についてシナリオを進めましょう" })
                    localStorage.setItem('scenarioHist', JSON.stringify(tmpArray))
                    console.log("DB")

                    //ログから会話履歴をもってくる

                    fetch("https://jtb-prd.two-choices.jp/api/scenario/log/", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': Authorization,
                            'accesstoken': Accesstoken
                        },
                        body: JSON.stringify({ scenario: { nextSentenceId: "547", personName: "ナレーター", plane: "チェックインできました。席についてシナリオを進めましょう" } })
                    })
                    window.alert("チェックインできました。チャット画面に戻ってシナリオを進めてください。")
                    
                    // alert("SELECT範囲内")
                } else {
                    console.log("SELECT範囲外")
                    window.alert("チェックインできませんでした。再度チェックインしてください。")
                    // alert("SELECT範囲外")
                }
            }
            //test
            if (google.maps.geometry.spherical.computeDistanceBetween(latlng, testArea.getCenter()) <= testArea.getRadius()) { //領域判定
                console.log("test範囲内")
            } else {
                console.log("test駅範囲外")
            }
        }, failure => {
            if (failure.message.startsWith("Only secure origins are allowed")) {
                console.log("secure issuess")
            }
        });
    }

    //------------

    return <div>
        {/* <button onClick={() => getCurrentPosition()}>チェックイン</button> */}
        {/* <input id="google" type="text"></input> */}
        {/* <div>latitude:{position?.latitude}</div> */}
        {/* <div>longtitude:{position?.longitude}</div> */}
        <div className={classes.mapWrapper}>


            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={center}
                options={options}
            >

                {position?.latitude && <Marker
                    position={new google.maps.LatLng(position?.latitude, position?.longitude)}//値が入っていることを保証しないとエラー
                // icon={"📝"}
                // label={"Marker！！"}
                // visible={true}
                // onLoad={onLoad}
                />}
                {tokyoShow === true ?
                    <div>
                        <Marker
                            position={tokyoArea.getCenter()}
                        // icon={"📝"}
                        // label={"Marker！！"}
                        // visible={true}
                        // onLoad={onLoad}
                        />
                        <Circle
                            center={tokyoArea.getCenter()}
                            radius={200}
                            visible={true}
                        ></Circle>
                    </div>

                    :
                    <div></div>
                }

                {oyaShow === true ?
                    <div>
                        <Marker
                            position={oyashiryokanArea.getCenter()}
                        />
                        <Circle
                            center={oyashiryokanArea.getCenter()}
                            radius={100}
                            visible={true}
                        ></Circle>
                    </div>
                    :
                    <div></div>
                }
                {oyaderaShow === true ?
                    <div>
                        <Marker
                            position={oyaderaArea.getCenter()}
                        />
                        <Circle
                            center={oyaderaArea.getCenter()}
                            radius={150}
                            visible={true}
                        ></Circle>
                    </div>
                    :
                    <div></div>
                }
                {kurirujuShow === true ?
                    <div>
                        <Marker
                            position={kurirujuArea.getCenter()}
                        />
                        <Circle
                            center={kurirujuArea.getCenter()}
                            radius={100}
                            visible={true}
                        ></Circle>
                    </div>
                    :
                    <div></div>
                }
                {mogamijayaShow === true ?
                    <div>
                        <Marker
                            position={mogamijayaArea.getCenter()}
                        />
                        <Circle
                            center={mogamijayaArea.getCenter()}
                            radius={100}
                            visible={true}
                        ></Circle>
                    </div>
                    :
                    <div></div>
                }
                {wakatakeShow === true ?
                    <div>
                        <Marker
                            position={wakatakeArea.getCenter()}
                        />
                        <Circle
                            center={wakatakeArea.getCenter()}
                            radius={100}
                            visible={true}
                        ></Circle>
                    </div>
                    :
                    <div></div>
                }
                {utsunomiyaZooShow === true ?
                    <div>
                        <Marker
                            position={utsunomiyaZooArea.getCenter()}
                        />
                        <Circle
                            center={utsunomiyaZooArea.getCenter()}
                            radius={100}
                            visible={true}
                        ></Circle>
                    </div>
                    :
                    <div></div>
                }
                {utsunomiyaTowerShow === true ?
                    <div>
                        <Marker
                            position={utsunomiyaTowerArea.getCenter()}
                        />
                        <Circle
                            center={utsunomiyaTowerArea.getCenter()}
                            radius={100}
                            visible={true}
                        ></Circle>
                    </div>
                    :
                    <div></div>
                }
                {kurasseShow === true ?
                    <div>
                        <Marker
                            position={kurasseArea.getCenter()}
                        />
                        <Circle
                            center={kurasseArea.getCenter()}
                            radius={100}
                            visible={true}
                        ></Circle>
                    </div>
                    :
                    <div></div>
                }
                {utsunomiyaParkShow === true ?
                    <div>
                        <Marker
                            position={utsunomiyaParkArea.getCenter()}
                        />
                        <Circle
                            center={utsunomiyaParkArea.getCenter()}
                            radius={150}
                            visible={true}
                        ></Circle>
                    </div>
                    :
                    <div></div>
                }
                {futarayamaShow === true ?
                    <div>
                        <Marker
                            position={futarayamaArea.getCenter()}
                        />
                        <Circle
                            center={futarayamaArea.getCenter()}
                            radius={100}
                            visible={true}
                        ></Circle>
                    </div>
                    :
                    <div></div>
                }
                {selectCafeShow === true ?
                    <div>
                        <Marker
                            position={selectCafeArea.getCenter()}
                        />
                        <Circle
                            center={selectCafeArea.getCenter()}
                            radius={100}
                            visible={true}
                        ></Circle>
                    </div>
                    :
                    <div></div>
                }
                <Button
                    className={classes.checkIn}
                    variant="contained"
                    disableElevation
                    onClick={() => {
                        getCurrentPosition()
                    }}
                >
                    チェックイン
        </Button>
            </GoogleMap>
        </div>

        <BottomTab />
    </div>
}







export default GoogleMapAPI;