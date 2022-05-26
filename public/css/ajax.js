$(document).ready(function () {
    $("div.quote-wrapper").on('submit', function (e) {
        e.preventDefault();
        var quote = $('class=quote');
        var name = $('class=name');
        $.ajax({
                url: '/',
                data: data {
                    quote: quote,
                    name: name
                },
                dataType: 'text'
            })
            .done(function (data) {
                $('h1').html(data.quote);
            });
    });
});