
angular.module('app').controller('themTourDuLich', ['$scope', '$http', '$location', '$rootScope', function ($scope, $http, $location, $rootScope) {
    // Your controller's code...
    // Controller logic

    $scope.s = ''
    $scope.headerText = "Thêm tour du lịch";
    $scope.editor = "";



    let saveTour = document.getElementById('savetour');
    saveTour.style.disabled = true
    document.getElementById('plantour').style.display = "none";
    var firebaseConfig = {
        apiKey: "AIzaSyBnSgLNQca9x6g5SFN8CU9YA1tBz5gGn6c",
        authDomain: "travel-bee-e0b59.firebaseapp.com",
        projectId: "travel-bee-e0b59",
        storageBucket: "travel-bee-e0b59.appspot.com",
        messagingSenderId: "991526403311",
        appId: "1:991526403311:web:24e7a3ba76e7d0d769af1a",
        measurementId: "G-DE29CFQQMY"
    };
    var config = firebase.initializeApp(firebaseConfig);
    $scope.image = ''
    document.getElementById('fileInputfb').onchange = function (e) {
        let files = e.target.files;
        Swal.fire({
            title: 'Please await!',
            text: 'Vui lòng đợi 5s để upload ảnh!',
            icon: 'warning',
            timer: 5000,
        });
        $scope.uploadfirebase(files)
        saveTour.style.disabled = false
        saveTour.style.backgroundColor = "green";


    }




    $scope.uploadfirebase = function (files) {

        const ref = firebase.storage().ref();

        if (files.length === 0) {
            console.log("Vui lòng chọn ít nhất một tệp hình ảnh.");
            return;
        }

        const uploadPromises = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const metadata = {
                contentType: file.type,
            };
            const name = file.name;
            const uploadIMG = ref.child(name).put(file, metadata);

            const promise = uploadIMG
                .then((snapshot) => snapshot.ref.getDownloadURL())
                .then((url) => {
                    return url;
                });

            uploadPromises.push(promise);
        }

        Promise.all(uploadPromises)
            .then((downloadURLs) => {
                list = downloadURLs;

                console.log(list.join(","))
                Swal.fire({
                    title: 'Success!',
                    text: 'Images uploaded successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            })

            .catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to upload images: ' + error,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }


    // Function to submit form
    $scope.submitForm = function () {
        var imagesString = list.join(",");
        var locationData = {
            title: $scope.title,
            description: $scope.description,
            price: $scope.price,
            location: $scope.location,
            images: imagesString,
            email: $rootScope.email
        };
        $http.post($rootScope.url + "/api/v1/tour/save", locationData, {
            headers: {
                'Authorization': 'Bearer ' + $rootScope.token
            }
        })
            .then(function (response) {
                localStorage.setItem('tourID', response.data.id)
                Swal.fire({
                    title: 'Thành công!',
                    text: 'Thêm tour thành công',
                    icon: 'success'
                });
                document.getElementById('plantour').style.display = "block";

            })
            .catch(function (error) {
                console.log(error)
            });

    }



    $scope.ckeditor = function () {
        CKEDITOR.ClassicEditor.create(document.getElementById("editor"), {
            height: 1000,
            // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html#extended-toolbar-configuration-format
            toolbar: {
                items: [
                    'exportPDF', 'exportWord', '|',
                    'findAndReplace', 'selectAll', '|',
                    'heading', '|',
                    'bold', 'italic', 'strikethrough', 'underline', 'code', 'subscript', 'superscript', 'removeFormat', '|',
                    'bulletedList', 'numberedList', 'todoList', '|',
                    'outdent', 'indent', '|',
                    'undo', 'redo',
                    '-',
                    'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'highlight', '|',
                    'alignment', '|',
                    'link', 'uploadImage', 'blockQuote', 'insertTable', 'mediaEmbed', 'codeBlock', 'htmlEmbed', '|',
                    'specialCharacters', 'horizontalLine', 'pageBreak', '|',
                    'textPartLanguage', '|',
                    'sourceEditing'
                ],
                shouldNotGroupWhenFull: true
            },
            // Changing the language of the interface requires loading the language file using the <script> tag.
            // language: 'es',
            list: {
                properties: {
                    styles: true,
                    startIndex: true,
                    reversed: true
                }
            },
            // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html#configuration
            heading: {
                options: [
                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                    { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                    { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                    { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                    { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
                ]
            },
            // https://ckeditor.com/docs/ckeditor5/latest/features/editor-placeholder.html#using-the-editor-configuration
            placeholder: 'Nhập mô tả chi tiết!',
            // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-family-feature
            fontFamily: {
                options: [
                    'default',
                    'Arial, Helvetica, sans-serif',
                    'Courier New, Courier, monospace',
                    'Georgia, serif',
                    'Lucida Sans Unicode, Lucida Grande, sans-serif',
                    'Tahoma, Geneva, sans-serif',
                    'Times New Roman, Times, serif',
                    'Trebuchet MS, Helvetica, sans-serif',
                    'Verdana, Geneva, sans-serif'
                ],
                supportAllValues: true
            },
            // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-size-feature
            fontSize: {
                options: [10, 12, 14, 'default', 18, 20, 22],
                supportAllValues: true
            },
            // Be careful with the setting below. It instructs CKEditor to accept ALL HTML markup.
            // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html#enabling-all-html-features
            htmlSupport: {
                allow: [
                    {
                        name: /.*/,
                        attributes: true,
                        classes: true,
                        styles: true
                    }
                ]
            },
            // Be careful with enabling previews
            // https://ckeditor.com/docs/ckeditor5/latest/features/html-embed.html#content-previews
            htmlEmbed: {
                showPreviews: true
            },
            // https://ckeditor.com/docs/ckeditor5/latest/features/link.html#custom-link-attributes-decorators
            link: {
                decorators: {
                    addTargetToExternalLinks: true,
                    defaultProtocol: 'https://',
                    toggleDownloadable: {
                        mode: 'manual',
                        label: 'Downloadable',
                        attributes: {
                            download: 'file'
                        }
                    }
                }
            },
            // https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#configuration
            mention: {
                feeds: [
                    {
                        marker: '@',
                        feed: [
                            '@apple', '@bears', '@brownie', '@cake', '@cake', '@candy', '@canes', '@chocolate', '@cookie', '@cotton', '@cream',
                            '@cupcake', '@danish', '@donut', '@dragée', '@fruitcake', '@gingerbread', '@gummi', '@ice', '@jelly-o',
                            '@liquorice', '@macaroon', '@marzipan', '@oat', '@pie', '@plum', '@pudding', '@sesame', '@snaps', '@soufflé',
                            '@sugar', '@sweet', '@topping', '@wafer'
                        ],
                        minimumCharacters: 1
                    }
                ]
            },
            // The "superbuild" contains more premium features that require additional configuration, disable them below.
            // Do not turn them on unless you read the documentation and know how to configure them and setup the editor.
            removePlugins: [
                // These two are commercial, but you can try them out without registering to a trial.
                // 'ExportPdf',
                // 'ExportWord',
                'AIAssistant',
                'CKBox',
                'CKFinder',
                'EasyImage',
                // This sample uses the Base64UploadAdapter to handle image uploads as it requires no configuration.
                // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/base64-upload-adapter.html
                // Storing images as Base64 is usually a very bad idea.
                // Replace it on production website with other solutions:
                // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html
                // 'Base64UploadAdapter',
                'MultiLevelList',
                'RealTimeCollaborativeComments',
                'RealTimeCollaborativeTrackChanges',
                'RealTimeCollaborativeRevisionHistory',
                'PresenceList',
                'Comments',
                'TrackChanges',
                'TrackChangesData',
                'RevisionHistory',
                'Pagination',
                'WProofreader',
                // Careful, with the Mathtype plugin CKEditor will not load when loading this sample
                // from a local file system (file://) - load this site via HTTP server if you enable MathType.
                'MathType',
                // The following features are part of the Productivity Pack and require additional license.
                'SlashCommand',
                'Template',
                'DocumentOutline',
                'FormatPainter',
                'TableOfContents',
                'PasteFromOfficeEnhanced',
                'CaseChange'
            ]
        }).then(instance => {
            // Store the CKEditor instance in the global variable
            $scope.editor = instance;
            // Add blur event listener to CKEditor instance
        })
            .catch(error => {
                console.error('Error during CKEditor initialization:', error);
            });
    }

    $scope.ckeditor();

    $scope.plantour = {
        startDate: '',
        endDate: "",
        email: $rootScope.email,
        tourId: Number(localStorage.getItem('tourID'))
    }

    $scope.savePlantour = () => {
        $scope.plantour.description = $scope.editor.getData()
        console.log($scope.plantour)
        $http.post($rootScope.url + "/api/v1/plant-tour/save", $scope.plantour, {
            headers: {
                'Authorization': 'Bearer ' + $rootScope.token
            }
        })
            .then(function (response) {
                Swal.fire({
                    title: 'Thành công!',
                    text: 'Thêm Thời gian thành công',
                    icon: 'success'
                });
                $location.url("/QuanLyTour")

            })
            .catch(function (error) {
                console.log(error)
            });
    }




}]);

