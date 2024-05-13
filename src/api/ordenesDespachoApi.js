import { URL_MASTERLOGIC_API } from "../utils/general";

const fetchOrdenesDespacho = async () => {
  try {
    const response = await fetch(`${URL_MASTERLOGIC_API}/db.json`);
    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }
    const data = await response.json();
    console.log(data);
    return data.ordenesDespacho;
  } catch (error) {
    console.error(error);
  }
};

async function fetchOrdenesDespachoOsis(filtros) {
  try {
    const response = await fetch(`${URL_MASTERLOGIC_API}/db.json`);
    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }
    const data = await response.json();
    console.log(data);
    return data.ordenesDespachoOsis;
  } catch (error) {
    console.error(error);
  }
}

const objOrdenesDespachoEntity = {
  result: [
    {
      cia_codcia: "",
      suc_codsuc: "",
      ppc_numppc: "",
      odc_numodc: "",
      ano_codano: "",
      mes_codmes: "",
      odc_fecdoc: "",
      odc_tipcam: "",
      tmo_codtmo: "",
      odc_impbru: "",
      odc_tasdct: "",
      odc_impde1: "",
      odc_impde2: "",
      odc_impigv: "",
      odc_imptot: "",
      odc_sitord: "",
      odc_obsodc: "",
      odc_usuaut: "",
      odc_fecaut: "",
      alm_codalm: "",
      odc_nompre: "",
      odc_indcan: "",
      aux_codaux: "",
      lde_codlde: "",
      pro_codpro: "",
      zve_codzve: "",
      pro_codage: "",
      lde_codfac: "",
      odc_impseg: "",
      odc_impfle: "",
      odc_indexp: "",
      tve_codtve: "",
      odc_obsexp: "",
      mmo_codmmo: "",
      odc_indcal: "",
      odc_tasigv: "",
      alm_codtra: "",
      odc_ordcom: "",
      odc_indest: "",
      odc_fecact: "",
      odc_codusu: "",
      odc_lugent: "",
      odc_codtdo: "",
      odc_numdoc: "",
      odc_impdes: "",
      odc_valvta: "",
      egv_numegv: "",
      odc_usucre: "",
      odc_feccre: "",
      odc_rescot: "",
      odc_lpnenc: "",
      grc_tipdoc: "",
      grc_numdoc: "",
      sit_codsit: "",
    },
  ],
};

const objCarritoOrdenesDespachoEntity = {
  sede: "",
  fechaEntrega: "",
  observacion: "",
  volumen: "",
  bultos: "",
  peso: "",
  monto: "",
  listaOD:[
    {
      cia_codcia: "",
      suc_codsuc: "",
      ppc_numppc: "",
      odc_numodc: "",
      ano_codano: "",
      mes_codmes: "",
      odc_fecdoc: "",
      odc_tipcam: "",
      tmo_codtmo: "",
      odc_impbru: "",
      odc_tasdct: "",
      odc_impde1: "",
      odc_impde2: "",
      odc_impigv: "",
      odc_imptot: "",
      odc_sitord: "",
      odc_obsodc: "",
      odc_usuaut: "",
      odc_fecaut: "",
      alm_codalm: "",
      odc_nompre: "",
      odc_indcan: "",
      aux_codaux: "",
      lde_codlde: "",
      pro_codpro: "",
      zve_codzve: "",
      pro_codage: "",
      lde_codfac: "",
      odc_impseg: "",
      odc_impfle: "",
      odc_indexp: "",
      tve_codtve: "",
      odc_obsexp: "",
      mmo_codmmo: "",
      odc_indcal: "",
      odc_tasigv: "",
      alm_codtra: "",
      odc_ordcom: "",
      odc_indest: "",
      odc_fecact: "",
      odc_codusu: "",
      odc_lugent: "",
      odc_codtdo: "",
      odc_numdoc: "",
      odc_impdes: "",
      odc_valvta: "",
      egv_numegv: "",
      odc_usucre: "",
      odc_feccre: "",
      odc_rescot: "",
      odc_lpnenc: "",
      grc_tipdoc: "",
      grc_numdoc: "",
      sit_codsit: "",
    },
  ]
}

export {
  fetchOrdenesDespacho,
  fetchOrdenesDespachoOsis,
  objOrdenesDespachoEntity,
  objCarritoOrdenesDespachoEntity
};
