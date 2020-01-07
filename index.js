function loadScript(url) {
    return new Promise(
        (resolve) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            document.body.appendChild(script);
        })
}

function loadStyle(url) {
    return new Promise(
        (resolve) => {
            const link_tag = document.createElement('link');
            link_tag.rel = 'stylesheet';
            link_tag.type = 'text/css';
            link_tag.href = url;
            link_tag.onload = resolve;
            document.head.appendChild(link_tag);
        })
}


async function loadAllScripts(urls) {
    for (let url of urls) {
        await loadScript(url);
    }
}

async function loadAllStyles(urls) {
    for (let url of urls) {
        await loadStyle(url);
    }
}



window.addEventListener('DOMContentLoaded', function () {
    const args = {};
    // ?以降の結果を取得する
    document.location.search.substring(1).split('&').forEach(
        (s) => {
            let [name, value] = s.split('=');
            // decode
            args[name] = decodeURIComponent(value);
        })
    const codelist = args['code'];
    const stylelist = args['style'];
    const tablelist = args['table'];

    console.log('codelist', codelist);
    console.log('stylelist', stylelist);
    console.log('tablelist', tablelist);

    // 取り敢えずは一つしかないものとして実装する
    if (tablelist) {
        var tableurl = tablelist;
        var header;
        var xyElement;
        fetch(tableurl).then(function (response) {
            return response.text();
        }).then(function (text) {
            var tempElement = text.split(/\n/);
            header = tempElement.slice(0, 1);
            header = header[0].split(/,/);
            xyElement = tempElement.slice(1).join(/\n/);
            document.getElementById('header').innerHTML = header;
            document.getElementById('element').innerHTML = xyElement;
        })

    }


    if (codelist) {
        let urls = codelist.split(/,/);
        loadAllScripts(urls);
    }

    if (stylelist) {
        let urls = stylelist.split(/,/);
        loadAllStyles(urls);
    }

}

)
