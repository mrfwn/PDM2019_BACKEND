  var $table = $('#table')
  var $remove = $('#remove')
  var selections = []

  function getIdSelections() {
    return $.map($table.bootstrapTable('getSelections'), function (row) {
      return row.id
    })
  }

  function responseHandler(res) {
    $.each(res.rows, function (i, row) {
      row.state = $.inArray(row.id, selections) !== -1
    })
    return res
  }

  function detailFormatter(index, row) {
    var html = []
    $.each(row, function (key, value) {
      html.push('<p><b>' + key + ':</b> ' + value + '</p>')
    })
    return html.join('')
  }

  function operateFormatter(value, row, index) {
    return [
      '<a class="like" href="javascript:void(0)" title="Enviar Convite">',
      '<i class="fa fa-envelope"></i>',
      '</a>  ',
      '<a class="remove" href="javascript:void(0)" title="Remover Convidado">',
      '<i class="fa fa-trash"></i>',
      '</a>'
    ].join('')
  }

  

  function totalTextFormatter(data) {
    return 'Total'
  }

  function totalNameFormatter(data) {
    //console.log("PAGINA: " + JSON.stringify(data))
    return data.length
  }

  function totalPriceFormatter(data) {
    var field = this.field
    return data.length
    /*
    return data.map(function (row) {
      return row[field].substring(1)
    }).reduce(function (sum, i) {
      return sum + i
    }, 0)*/
  }

  window.operateEvents = {
    'click .like': function (e, value, row, index) {
      alert('You click like action, row: ' + JSON.stringify(row))
    },
    'click .remove': function (e, value, row, index) {
        alert('You click like action, row: ' + JSON.stringify(row));
      $table.bootstrapTable('remove', {
        field: 'id',
        values: [row.id]
      })
    }
  }

  function initTable() {
    $table.bootstrapTable('destroy').bootstrapTable({
      height: 530,
      locale: "pt-BR",//$('#locale').val(),
      columns: [
        [{
          field: 'state',
          checkbox: true,
          rowspan: 2,
          align: 'center',
          valign: 'middle'
        }, {
          title: 'Nome',
          field: 'id',
          rowspan: 2,
          align: 'center',
          valign: 'middle',
          sortable: true,
          footerFormatter: totalTextFormatter
        },{
          title: 'Lista de Convidados',
          colspan: 3,
          align: 'center'
        }],
        [{
          field: 'name',
          title: 'Email',
          sortable: true,
          footerFormatter: totalNameFormatter,
          align: 'center'
        }, {
          field: 'price',
          title: 'Cargo',
          sortable: true,
          align: 'center',
          footerFormatter: totalPriceFormatter
        },  {
          field: 'operate',
          title: 'Opções',
          align: 'center',
          events: window.operateEvents,
          formatter: operateFormatter
        }]
      ]
    })
    $table.on('check.bs.table uncheck.bs.table ' +
      'check-all.bs.table uncheck-all.bs.table',
    function () {
      $remove.prop('disabled', !$table.bootstrapTable('getSelections').length)

      // save your data, here just save the current page
      selections = getIdSelections()
      // push or splice the selections if you want to save all data selections
    })
    $table.on('all.bs.table', function (e, name, args) {
      console.log(name, args)
    })
    $remove.click(function () {
      var ids = getIdSelections()
      $table.bootstrapTable('remove', {
        field: 'id',
        values: ids
      })
      $remove.prop('disabled', true)
    })
  }

  $(function() {
    initTable()

    $('#locale').change(initTable)
  })
