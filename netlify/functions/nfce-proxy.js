exports.handler = async (event) => {
  const url = event.queryStringParameters?.url;

  if (!url) {
    return { statusCode: 400, body: JSON.stringify({ error: "URL obrigatória" }) };
  }

  // Whitelist de domínios permitidos (apenas Fazendas estaduais)
  const allowedDomains = [
    "fazenda.pr.gov.br",
    "nfce.fazenda.sp.gov.br",
    "nfe.sefaz.rs.gov.br",
    "nfce.set.rn.gov.br",
    "nfce.sefaz.am.gov.br",
    "nfce.sefaz.go.gov.br",
    "nfce.sefaz.mg.gov.br",
    "nfce.sefaz.sc.gov.br",
    "nfce.sefaz.ba.gov.br",
    "nfce.sefaz.pe.gov.br",
    "nfce.sefaz.ce.gov.br",
    "nfce.sefaz.mt.gov.br",
    "nfce.sefaz.ms.gov.br",
    "nfce.sefaz.pa.gov.br",
    "nfce.sefaz.pi.gov.br",
    "nfce.sefaz.ma.gov.br",
    "nfce.sefaz.al.gov.br",
    "nfce.sefaz.se.gov.br",
    "nfce.sefaz.rr.gov.br",
    "nfce.sefaz.ro.gov.br",
    "nfce.sefaz.ap.gov.br",
    "nfce.sefaz.to.gov.br",
    "nfce.sefaz.ac.gov.br",
    "nfce.sefaz.pb.gov.br",
    "nfce.sefaz.rn.gov.br",
    "nfce.sefaz.es.gov.br",
    "sefaz.df.gov.br",
  ];

  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: "URL inválida" }) };
  }

  const domain = parsedUrl.hostname;
  const isAllowed = allowedDomains.some((allowed) => domain.includes(allowed));

  if (!isAllowed) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        error: `Domínio não permitido: ${domain}. Apenas URLs de Fazendas estaduais são aceitas.`,
      }),
    };
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 11; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9",
      },
      timeout: 9000,
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: `Erro ao acessar a Fazenda: ${response.status} ${response.statusText}`,
        }),
      };
    }

    const html = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
      body: html,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: `Falha ao buscar a nota fiscal: ${err.message}`,
      }),
    };
  }
};
