(() => {

  $(() => {

    $(document).on('click', 'a[data-ajax]', (event) => { // AJAX link handler
      event.preventDefault();
      const $element = $(event.target);
      $.ajax($element.attr('href'), {
        method: $element.data('method') || 'GET',
        dataType: 'json',
        success: (response) => response.success ? location.reload() : alert(`Error: ${response.error}`)
      });
      return false;
    }).on('submit', 'form[data-ajax]', (event) => { // AJAX form handler
      event.preventDefault();
      const $element = $(event.target);
      $.ajax($element.attr('action'), {
        method: $element.attr('method') || 'POST',
        dataType: 'json',
        data: $element.serialize(),
        success: (response) => response.success ? location.reload() : alert(`Error: ${response.error}`)
      });
      return false;
    }).on('click', '.js-item-edit', (event) => { // Edit item handler
      event.preventDefault();
      const $element = $(event.target);
      $.ajax($element.attr('href'), {
        method: 'GET',
        dataType: 'json',
        success: (response) => {
          const $section = $element.closest('.js-section');
          const $form    = $section.find('form[data-ajax]');
          $section.find('.js-show-on-add').hide();
          $section.find('.js-show-on-edit').show();
          $section.find('.js-item-id').text(response.data.id);
          $form.attr({ action: $element.attr('href'), method: 'PUT' });
          $.each(response.data, (key, value) => {
            $form[0][key] ? $form[0][key].value = value : null;
          });
        }
      });
      return false;
    }).on('click', '.js-item-edit-cancel', (event) => { // Cancel editing handler
      event.preventDefault();
      const $element = $(event.target);
      const $form    = $element.closest('form[data-ajax]');
      $form.attr({ action: $element.data('create-url'), method: 'POST' })[0].reset();
      $form.find('.js-show-on-edit').hide();
      $form.find('.js-show-on-add').show();
      return false;
    });

  });

})();
