function myFunction() {
    Logger.log('もぐもぐ〜');
}

function doGet(e) {
    // GET Resource
    // for debug, using curl command
    // curl -H "Content-Type: application/json" -SsL ${RESOURCE_URL}
    const output = ContentService.createTextOutput();
    output.setContent(JSON.stringify({ message: "health check, OK!" })).setMimeType(ContentService.MimeType.JSON);
    return output;
}

function doPost(e) {
    // POST Resource
    // for debug, using curl command
    // curl -H "Content-Type: application/json; charset=utf-8" -d '{"title": "テスト", "description": "てすとです。"}' -SsL ${RESOURCE_URL}"
    const params = JSON.parse(e.postData.getDataAsString());
    const formUrl = test({
        'title': params.title,
        'description': params.description,
    });

    Logger.log(`created ${formUrl}`);

    const output = ContentService.createTextOutput();
    const responseMessage: {[key: string]: string} = {
        message: "created yeah!",
        form_url: formUrl
    };
    output.setContent(JSON.stringify(responseMessage)).setMimeType(ContentService.MimeType.JSON);
    return output;
}
