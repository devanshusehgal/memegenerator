var app = angular.module('myApp', []);
var scope;
app.controller('myCtrl', function($scope, $timeout) {
    $scope.fonts = ['Impact', 'Arial', 'Comic Sans MS', 'Helvetica', 'Times New Roman', 'Courier', 'Verdana', 'Georgia'];
    
    $scope.categories = ['Art', 'Food', 'Music', 'Religion', 'Sports', 'Technology', 'Business', 'Dogs', 'Cats', 'Programming', 'Cartoons'];
    
    $scope.images = [
        {title: 'Leonardo Dicaprio Cheers', url: 'https://image.ibb.co/eiPok8/download_6.png', cats: ['Art', 'Music', 'Business'], texts: [{text: 'Top Text', left: 50, top: 10, font: 'Impact', color: '#fff', stroke: '#000', size: 40, editor: false}, {text: 'Bottom Text', left: 100, top: 0, font: 'Impact', color: '#fff', stroke: '#000', size: 40, editor: false}], samples: []},
        {title: 'The Most Interesting Man in the World', url: 'https://image.ibb.co/jPfTk8/download_5.png', cats: ['Art', 'Music', 'Business'], texts: [], samples: []},
        {title: 'Roll Safe Think About It', url: 'https://image.ibb.co/cacxdT/download_3.png', cats: ['Business', 'Music', 'Dogs', 'Programming'], texts: []},
        {title: 'Batman Slapping Robin', url: 'https://image.ibb.co/i4MCCo/download_2.png', cats: ['Programming', 'Cartoons', 'Dogs', 'Cats'], texts: []},
        {title: 'Futurama Fry', url: 'https://image.ibb.co/cBxVyT/download.png', cats: ['Cartoons'], texts: []},
        {title: 'Mocking Spongebob', url: 'https://image.ibb.co/hOgCCo/download_1.png', cats: ['Cartoons'], texts: []},
        {title: 'Grumpy Cat', url: 'https://image.ibb.co/fo3EQ8/download_8.png', cats: ['Cats'], texts: []},
        {title: 'Doge', url: 'https://image.ibb.co/gSpAyT/download_7.png', cats: ['Dogs'], texts: []}
    ];

    $scope.updateCategory = (cat) => {
        $scope.values.category = cat;
        $timeout(() => {
            $('.tooltipped').tooltip({margin: -10});
        }, 1000);
    };

    $scope.openGenerator = (image) => {
        $scope.values.currentImage = image;
        
        $timeout(() => {
            $('.draggable').draggable({containment: 'parent'}).resizable();  
            $('select').formSelect();
            $('.color-picker').spectrum({preferredFormat: 'hex'});
            $('#modal1').modal('open');            
        }, 100);
    }

    $scope.textMoved = (text, event) => {
        text.left = event.target.style.left;
        text.top = event.target.style.top;
    }

    $scope.newTextbox = () => {
        $scope.values.currentImage.texts.push({text: 'New Text', left: 50, top: 10, font: 'Impact', color: '#fff', stroke: '#000', size: 40, editor: true});
        $timeout(() => {
            $('.draggable').draggable({containment: 'parent'}).resizable();  
            $('select').formSelect();
            $('.color-picker').spectrum({preferredFormat: 'hex'});
        }, 100);
    }

    $scope.downloadMeme = () => {
        $('#temp').removeClass('invisible');
        $('#temp').width($('#mg-image').width());
        $('#temp').height($('#mg-image').height());
        $('#temp').html($('#mg-image').html());

        html2canvas(document.getElementById('temp'), {
            useCORS: true,
            onrendered: (canvas) => {
                const memeImage = canvas.toDataURL("image/jpeg");
                $('#temp').addClass('invisible');
                $('#modal1').modal('close');
                downloadURI(memeImage, 'Meme ' + $scope.values.currentImage.title + '.jpg');
            }
        });
    }

    $scope.customImageUpdated = (url) => {
        $scope.values.currentImage = {
            title: 'Custom',
            url: url,
            cats: ['Custom'],
            texts: [{text: 'Top Text', left: 100, top: 0, font: 'Impact', color: '#fff', stroke: '#000', size: 40, editor: true}, {text: 'Bottom Text', left: 100, top: 100, font: 'Impact', color: '#fff', stroke: '#000', size: 40, editor: true}],
            samples: []
        };
        $scope.$apply();

        $timeout(() => {
            $('.draggable').draggable({containment: 'parent'}).resizable();  
            $('select').formSelect();
            $('.color-picker').spectrum({preferredFormat: 'hex'});
            $('#modal1').modal('open');            
        }, 100);
    }

    $scope.values = {
        category: 'All',
        currentImage: null
    };

    scope = $scope;
});

$(document).ready(() => {
    $('.sidenav').sidenav();
    $('.dropdown-trigger').dropdown();
    $('.tooltipped').tooltip({margin: -10});
    $('.modal').modal();

    $('#select-image').on('change', () => {
        const f = $('#select-image')[0];

        if (f.files && f.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                scope.customImageUpdated(e.target.result);
            }
            reader.readAsDataURL(f.files[0]);
        }
    });
});

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;

    document.body.appendChild(link);
    
    link.click();
}

function selectImage() {
    $('#select-image').val('');
    $('#select-image').click();
}