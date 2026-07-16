function checkLength() {

    if (!metaTitle || !metaDescription || !titleCount || !descCount || !titleStatus || !descStatus) {
        return;
    }


    // =============================
    // META TITLE CHECK
    // =============================

    const titleLength = metaTitle.value.length;
    titleCount.innerHTML = titleLength + " / 60";

    if (titleLength === 0) {
        titleStatus.innerHTML = "⚪ Enter Meta Title";
        titleStatus.style.color = "gray";

    } else if (titleLength < 30) {
        titleStatus.innerHTML = "❌ Too Short (Below 30)";
        titleStatus.style.color = "red";

    } else if (titleLength <= 49) {
        titleStatus.innerHTML = "⚠ Good (Can Improve)";
        titleStatus.style.color = "orange";

    } else if (titleLength <= 60) {
        titleStatus.innerHTML = "✅ Perfect";
        titleStatus.style.color = "green";

    } else {
        titleStatus.innerHTML = "❌ Too Long";
        titleStatus.style.color = "red";
    }



    // =============================
    // META DESCRIPTION CHECK
    // =============================

    const descLength = metaDescription.value.length;
    descCount.innerHTML = descLength + " / 160";


    if (descLength === 0) {
        descStatus.innerHTML = "⚪ Enter Meta Description";
        descStatus.style.color = "gray";

    } else if (descLength < 120) {
        descStatus.innerHTML = "❌ Too Short (Below 120)";
        descStatus.style.color = "red";

    } else if (descLength <= 139) {
        descStatus.innerHTML = "⚠ Good (Can Improve)";
        descStatus.style.color = "orange";

    } else if (descLength <= 160) {
        descStatus.innerHTML = "✅ Perfect";
        descStatus.style.color = "green";

    } else {
        descStatus.innerHTML = "❌ Too Long";
        descStatus.style.color = "red";
    }

}


