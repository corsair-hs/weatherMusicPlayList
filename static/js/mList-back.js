function mList_select(imgValue) {
    const _imgValue = imgValue;
    fetch('/mList_select_GET').then((res) => res.json()).then((data) => {
        let rows = data['result']
        $("#cards-box").empty()
        rows.forEach((a) => {
            let weather = a["weather"]
            let name = a["name"]
            let url = a["url"]
            let title = a["title"]
            let desc = a["desc"]
            let thumb = a['thumb']
            let ytbId = a['ytbId']

            if (weather === _imgValue) {
                let temp_html = `<div class="col">
                                        <div class="card h-100">
                                            <img src="${thumb}" class="card-img-top tgPointer1" onclick="imgClickMoviePlay(this)">
                                            <div class="card-body">
                                                <h5 class="card-title tgPointer2" onclick="h5ClickMoviePlay(this)">${title}</h5>
                                                <p class="card-text">${desc}</p>
                                                <p class="card-text ytbId">${ytbId}</p>
                                                <p class="mycomment">${name}</p>
                                                <button type="button" onclick="update_music(this)" class="btn btn-outline-dark btn-sm">수정</button>
                                                <button type="button" onclick="mList_delete(this)" class="btn btn-outline-dark btn-sm">삭제</button>
                                            </div>
                                        </div>
                                    </div>`
                $("#cards-box").append(temp_html);
            }
        })
    });
}

function mList_delete(button) {
    let row = $(button).closest('div.card-body');
    let ytbId = row.find('p:eq(1)').text();
    let weather = $("#weatherLabel").text();
    // console.log(ytbId)

    let formData = new FormData();
    formData.append("ytbId_give", ytbId);
    fetch('/mList_delete_POST', { method: "POST", body: formData, }).then((res) => res.json()).then((data) => {
        alert(data["msg"]);
        mList_select(weather)
    });
};

function mList_insert() {
    let weather = $("#weatherLabel").text();
    let name = $("#name").val();
    let url = $("#url").val();
    let desc = $("#desc").val();

    // desc 해시태그로 변환해주는 코드
    let arrDesc = desc.split(' ');   // ' ' 공백을 구분자로 arrDesc 배열에 담기
    let descResult = arrDesc.map((value) => '#'+value).join(' ');   // arrDesc 배열을 순회하며 각 요소들 앞에 #붙이기
                                                                                  // arrDesc 배열의 모든 요소들을 ' ' 공백을 사이로 하나의 문자열로 조인시키기

    let formData = new FormData();
    formData.append("weather_give", weather)
    formData.append("name_give", name)
    formData.append("url_give", url)
    formData.append("desc_give", descResult)

    fetch('/mList_insert_POST', { method: "POST", body: formData, }).then((response) => response.json()).then((data) => {
        alert(data["msg"]);
        $("#name").val('')
        $("#url").val('')
        $("#desc").val('')
        close_box();
        mList_select(weather)
    });
}