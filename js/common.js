$(function() {
  var rule = {
    birthplace: [],
    bunri: "",
    programing: ""
  };

  $('.tags > button').on('click', function() {
    // TODO: 文理とかのタグが切り替えられない
    $(this).toggleClass('border-primary');
    $(this).hasClass('border-primary') ? tagSelect() : tagUnSelect();
  });

  function tagSelect() {
    switch($(this).parent().attr('id')) {
      case 'birthplace':
        rule.birthplace.push($(this).attr('id'));
        break;
      case 'bunri':
        rule.bunri = $(this).attr('id');
        break;
      case 'programing':
        rule.programing = $(this).attr('id');
        break;
    }
  }

  function tagUnSelect() {
    switch($(this).parent().attr('id')) {
      case 'birthplace':
        rule.birthplace = rule.birthplace.filter(id => id != $(this).attr('id'));
        break;
      case 'bunri':
        rule.bunri = "";
        break;
      case 'programing':
        rule.programing = "";
        break;
    }
  }

  $('.clear').on('click', function() {
    $('.tags > button').removeClass('border-primary');
    $('.tags > button').addClass('border-light');
    rule = {
      birthplace: [],
      bunri: "",
      programing: ""
    };
  });

  $('.sort').on('click', function() {
    // 該当メンバー表示
    $('.filter-result > div').each(function(index, el){
      if(rule.birthplace.some(value => $(el).hasClass(value)) && $(el).hasClass(rule.bunri) && $(el).hasClass(rule.programing)) {
        $(el).addClass('d-flex-center');
      } else {
        $(el).addClass('d-none');
      }
    });
  });

  var memberSlider = $(".member.center").slick({
    infinite: true,
    centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 3
  });

  $('#nav-member-tab').click(function () {
    memberSlider.css('opacity',0);
    memberSlider.animate({'z-index':1},300,function(){
      memberSlider.slick('setPosition');
      memberSlider.animate({'opacity':1});
    });
  });

  var teamSlider = $(".team.center").slick({
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1
  });

  $('#nav-team-tab').click(function () {
    teamSlider.css('opacity',0);
    teamSlider.animate({'z-index':1},300,function(){
      teamSlider.slick('setPosition');
      teamSlider.animate({'opacity':1});
    });
  });

  var hash = location.hash.slice(1);
  if (hash === 'team') {
    $('#nav-member-tab, #nav-data-tab').removeClass('active');
    $('#nav-member, #nav-data').removeClass('show active');
    $(`#nav-${hash}-tab`).addClass('active');
    $(`#nav-${hash}`).addClass('show active');
  }
});