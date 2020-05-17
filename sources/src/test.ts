function test(data: { [key: string]: string }): string {
    const title: string = data['title'] || 'こんこんきつね'
    const description: string = data['description'] || 'きつねじゃないです、ねこです'
    const form: GoogleAppsScript.Forms.Form = FormApp.create(title);

    const folderId: string = PropertiesService.getScriptProperties().getProperty('FOLDER_ID');
    const formFile = DriveApp.getFileById(form.getId());
    DriveApp.getFolderById(folderId).addFile(formFile);
    DriveApp.getRootFolder().removeFile(formFile);

    form.setDescription(description);
    form.addTextItem().setTitle('氏名').setRequired(true);
    form.addTextItem().setTitle('存在');

    return form.getPublishedUrl();
}

function _test() {
    const data: {[key: string]: string} = {
        "title": "ゆびゆび（GASテスト用リソース）",
        "description": "いつもの挨拶です。"
    };

    const formUrl = test(data);
    Logger.log(`form url: ${formUrl}`);
}
