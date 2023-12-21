var map = new maplibregl.Map({
  container: "map",
  style: "map_styles/pilkas.json",
  center: [23.751,55.196],
  zoom: 7,
  minZoom:7,
  maxZoom:17,
  hash: true,
});

map.addControl(new maplibregl.NavigationControl());

function changeMapStyle(styleType) {
  map.setStyle("map_styles/" + styleType + ".json");
}

function basemapPilkas(){
  alert('Pasirinktas pilkšvas pagrindo žemėlapis')
}

function basemapTopografinis(){
  alert('Pasirinktas topografinis pagrindo žemėlapis')
}

function basemapLauko(){
  alert('Pasirinktas lauko pagrindo žemėlapis')
}

map.on("load", () => {
  loadLayers();
});

function toggleLayer(layerName) {
  const layerNameHtml = "layer-btn-" + layerName + "-layer";

  if (map.getLayoutProperty(layerName, "visibility") == "none") {
    map.setLayoutProperty(layerName, "visibility", "visible");
    document.getElementById(layerNameHtml).style.filter = "none";
  } else {
    map.setLayoutProperty(layerName, "visibility", "none");
    document.getElementById(layerNameHtml).style.filter = "grayscale()";
  }
}

function loadLayers() {
  console.log("Loading layers");

  //įsikeliamas mirtingumo žemėlapis, nes jis yra plotinis, tai jį pirmą reikia užkrauti, kad nedengtų kitų
  map.addSource("savizudybiu-rodikliai-source", {
    type: "raster",
    tiles: [
      "http://127.0.0.1:8010/ogc/demo_service_2?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=mirtingumas_del_savizudybes_2022m",
    ],
    tileSize: 256,
  });
  map.addLayer({
    id: "standartizuotas_savizudybiu_sk",
    type: "raster",
    source: "savizudybiu-rodikliai-source",
    layout: {
      visibility: "none",
    },
    paint: {},
  });

  map.addSource("bpc-source", {
    type: "raster",
    tiles: [
      "http://127.0.0.1:8010/ogc/demo_service?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=bpc_skambuciai",
    ],
    tileSize: 256,
  });
  map.addLayer({
    id: "bpc",
    type: "raster",
    source: "bpc-source",
    layout: {
      visibility: "none",
    },
    paint: {},
  });

  map.addSource("pagalba-source", {
    type: "raster",
    tiles: [
      "http://127.0.0.1:8010/ogc/demo_service_3?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=istaigos_ir_privatus_asmenys_teikiantys_psichologine_pagalba_2.5km_buferis_ist_sk",
    ],
    tileSize: 256,
  });
  map.addLayer({
    id: "pagalba",
    type: "raster",
    source: "pagalba-source",
    layout: {
      visibility: "none",
    },
  });
}

function layerMirtingumas(){
  alert('Pridėti savižudybių įvykusių 2020 m. rodikliai savivaldybių lygmeniu. Gali akimirką užtrūkti. Prašome luktelėti, kol pasikraus sluoksnis. Jei paspaudėte ant sluoksnio dar kartą, jis bus pašalintas iš peržiūros žemėlapio.')
}

function layerBPC(){
  alert('Pridėti Bendrojo pagalbos centro 2022 m. skambučių duomenys, kurie gali būti siejami su savižudybėmis ir pavojumi savo gyvybei. Gali akimirką užtrūkti. Prašome luktelėti, kol pasikraus sluoksnis.  Jei paspaudėte ant sluoksnio dar kartą, jis bus pašalintas iš peržiūros žemėlapio.')
}

function layerPagalba(){
  alert('Pridėti įstaigų ir privačių asmenų buveinių "žydynių" buferiai. Gali akimirką užtrūkti. Prašome luktelėti, kol pasikraus sluoksnis.  Jei paspaudėte ant sluoksnio dar kartą, jis bus pašalintas iš peržiūros žemėlapio.')
}