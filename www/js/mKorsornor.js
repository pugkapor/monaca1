	{
		var oUser = null;
		var oEbook = null;
		var oExam = null;
		var oCai = null;
		var oChangwad = null;//เก็บรายชื่อจังหวัด
		var oOrganize = null;
		var oSystem = null;//เก็บข้อมูลระบบทั้งหมด
		var oElibrary = null;//เก็บข้อมูล eLibrary
		var oPageControl = {"pnt":0,"name":[]};//ดูแลเรื่อง page
		var oTypes = null;//เก็บประเภทของ member
		var oPrename = null;//คำนำหน้า
		var oDegree = null;//วุฒิการศึกษา
		var oPosition = null;//ตำแหน่ง
		var oGender = null;//เพศ
		var oDummy = null;//ใช้สำหรับ เก็บค่า ค้นหา
		var oOrganizeDummy = null;//ใช้สำหรับเก็บค่าค้นหา
		var oFriends = null;//เพื่อนร่วมศูนย์

		var examDB = null;//ข้อมูลช้อสอบ

		var cPage = "";
		var lProfilePopup = false;
		var alWorkspace = [true,false,false];//xWorkspace1,xWorkspace2
		var alSaveWorkspace = [true, false, false];//เอาไว้เก็บสถานะล่าสุด
		var alRegi = [ false, false, false ];//เก็บสถานะ กศน. ตอนลงทะเบียนใน registerPage

		var cOldPage = "xWorkspace1";
		var cCurPage = "xWorkspace1";
		var lProfileLoaded = false;
		
		//var cWWWHeader = "http://m.mKorsornor.com/";
		var cWWWHeader = "http://www.mKorsornor.com/";
	}

		function _getOrganize( c ) {
			var cParam = cWWWHeader + "./assets/data/"+c+".json";
			$.get( cParam )
			.success(function(data) {
				oOrganize = JSON.parse( data );	
			}).fail(function() {
			});	
		}
		function _initParameter() {
			pageLoadingFrame('show','v2');
			
			var cParam = cWWWHeader + "./assets/data/changwad.json";
			$.get( cParam )
			.success(function(data) {
				//oChangwad = JSON.parse( data );	
				oChangwad = data;//alert( data );
			}).fail(function() {
			});	
			cParam = cWWWHeader + "./assets/data/prename.json";
			$.get( cParam )
			.success(function(data) {
				//oPrename = JSON.parse( data );	
				oPrename = data;
			}).fail(function() {
			});	
			cParam = cWWWHeader + "./assets/data/degree.json";
			$.get( cParam )
			.success(function(data) {
				//oDegree = JSON.parse( data );
				oDegree	= data;
			}).fail(function() {
			});	
			cParam = cWWWHeader + "./assets/data/position.json";
			$.get( cParam )
			.success(function(data) {
				//oPosition = JSON.parse( data );	
				oPosition = data;
			}).fail(function() {
			});	
			cParam = cWWWHeader + "./assets/data/gender.json";
			$.get( cParam )
			.success(function(data) {
				//oGender = JSON.parse( data );	
				oGender = data;
			}).fail(function() {
			});			
			
			pageLoadingFrame('hide','v2');
		}
		
		function _closeTeacherAll() {
			$("#xTeacSearch").hide();
			$("#xTeacBack").hide();
			$("#xTeacCheck").hide();
			$("#xTeacEdit").hide();
			$("#xTeacherMainmenu1").hide();
			$("#xTeacMemberEdit").hide();
			$("#xTeacExamEdit").hide();
			$("#xTeacSearchError").hide();
			$("#xTeacSearchFound").hide();
			$("#xTeacSearchMultiFound").hide();
			$("#xMemberEdit").hide();
		}
		
		function _backTeacSub() {
			_closeTeacherAll();
			$("#xTeacSearch").show();
			$("#xTeacBack").show();
			$("#xTeacBack2").hide();
			$("#xTeacSearchError").hide();
			$("#xTeacSearchFound").hide();
		}
		function _backTeacSub1() {
			_closeTeacherAll();
			$("#xTeacSearchMultiFound").show();
			$("#xTeacBack2").show();
			$("#xTeacBack3").hide();
			$("#xTeacSearchError").hide();
			$("#xTeacSearchFound").hide();
		}
		function _backTeacSub2() {
			_closeTeacherAll();
			$("#xTeacSearchMultiFound").hide();
			$("#xTeacBack").show();
			//$("#xTeacBack3").hide();
			$("#xTeacBack4").hide();
			$("#xTeacSearchError").hide();
			$("#xTeacSearchFound").hide();
			$("#xTeacCheck").show();
		}
		function _showMemberDetail( n, nType ) {
			$("#xTeacSearchMultiFound").hide();
			$("#xTeacSearchError").hide();
			if ( nType == 1 ) {
				$("#xTeacBack").hide();
				$("#xTeacBack2").hide();
				$("#xTeacBack3").show();
			}
			else {
				$("#xTeacBack").hide();
				$("#xTeacBack2").show();
				$("#xTeacBack3").hide();
			}
			$("#xTeacSearchFound").show();

//เติมข้อมูล			
			var nLen = oChangwad.changwad.length;//alert( n );
			$("#xTeacChangwad1").empty();
			for ( i = 0; i< nLen; i++ ) {
				$('#xTeacChangwad1').append($('<option>', { value: oChangwad.changwad[i].code,text: "กศน.จังหวัด"+oChangwad.changwad[i].name }));
			}
//อ่านอำเภอ
			var cChangwad = oDummy.rows[ n ].changwad ;
			var cParam = cWWWHeader + "./assets/data/"+cChangwad+".json";
			var nTambol = 0;
			var nAmphur = 0;
			$.get( cParam )
			.success(function(data) {
				oOrganize1 = JSON.parse( data );//alert( data );	
				var nLen = oOrganize1.amphurs.length;
				$("#xTeacAmphur1").empty();	
				for ( var i = 0; i< nLen; i++ ) {
					$('#xTeacAmphur1').append($('<option>', { value: oOrganize1.amphurs[i].code,text: "กศน.อำเภอ"+oOrganize1.amphurs[i].name }));
					if ( oDummy.rows[ n ].amphur == oOrganize1.amphurs[i].code ) {
						nTambol = i;
						nAmphur = i;
					}
				}
				nLen = oOrganize1.amphurs[ nAmphur ].tambols.length;
				$("#xTeacTambol1").empty();	
				for ( var i = 0; i< nLen; i++ ) {
					$('#xTeacTambol1').append($('<option>', { value: oOrganize1.amphurs[ nAmphur ].tambols[ i ].code,text: "กศน.ตำบล"+oOrganize1.amphurs[ nAmphur ].tambols[ i ].name }));
				}
				nLen = oPrename.prenames.length;//alert( nLen );
				$("#xTeacEditPrename1").empty();	
				for ( var i = 0; i< nLen; i++ ) {
					$('#xTeacEditPrename1').append($('<option>', { value: oPrename.prenames[ i ].code,text: oPrename.prenames[ i ].prename }));
				}
			
			nLen = oChangwad.changwad.length;
			$("#xTeacChangwad1").empty();
			for ( i = 0; i< nLen; i++ ) {
				$('#xTeacChangwad1').append($('<option>', { value: oChangwad.changwad[i].code,text: "กศน.จังหวัด"+oChangwad.changwad[i].name }));
			}
			$("#xTeacChangwad1").val( oDummy.rows[ n ].changwad );
			$("#xTeacAmphur1").val( oDummy.rows[ n ].amphur );
			$("#xTeacTambol1").val( oDummy.rows[ n ].tambol );
			$("#xTeacEditPrename1").val( oDummy.rows[ n ].prename_code );//alert( oDummy.rows[ n ].prename_code );
			$("#xTeacEditName1").val( oDummy.rows[ n ].name );
			$("#xTeacEditSurname1").val( oDummy.rows[ n ].surname );
			$("#xTeacEditNickname1").val( oDummy.rows[ n ].nickname );
			$("#xTeacEditMobile1").val( oDummy.rows[ n ].mobile );
			$("#xTeacEditEmail1").val( oDummy.rows[ n ].email );
//			$("#xTeacEditBorn1").val( oDummy.rows[ n ].born );
//			$("#xTeacEditSex1").val( oDummy.rows[ n ].sex );
		});
		}
		
		function _searchMemberResult() {
			var c = oUser.rows[ 0 ].changwad;
			var c1 = oUser.rows[ 0 ].amphur;
			var c2 = $("#xSearchMemberText").val().trim();
			var nLen = c2.length;
			if ( nLen > 0 ) {
				pageLoadingFrame('show','v2');
				//$("#xTeacSearch").hide();					
				var cParam = cWWWHeader + "php/controlDB.php?method=searchMember& param1=" + c + "& param2= " + c1 + "& param3=" + c2;
				var oTemp = new Object();			
				$.get( cParam )
				.success(function(data) {
					$("#xTeacSearch").hide();
					//oTemp = JSON.parse( data );	
					//alert( data );
					oDummy = JSON.parse( data );	
					if ( oDummy.total == 0 ) {
						//alert("A");
						$("#xTeacSearchError").show();
						$("#xTeacSearchFound").hide();
						$("#xTeacBack").hide();
						$("#xTeacSearchMultiFound").hide();
						$("#xTeacBack2").show();
					}  else {//>1 รายการ
						$("#xTeacSearchMultiFound").show();
						$("#xTeacSearchError").hide();
						$("#xTeacSearchFound").hide();
						$("#xTeacBack").hide();
						$("#xTeacBack2").show();
						var cStr = "";
						for ( var i = 0 ; i< oDummy.total; i++ ) {
							cStr += '<a href="javascript:void(0)" class="list-group-item" onClick="_showMemberDetail('+i+',1);">';
							cStr += '<div class="list-group-status status-online"></div>';
							cStr += '<img src="./assets/images/gallery/person.jpg" class="pull-left" alt=""/>';
							cStr += '<span class="contacts-title">'+oDummy.rows[i].name+" "+oDummy.rows[i].surname+'</span>';
							cStr += '<p>นักศึกษา</p>';
							cStr += '<div class="list-group-controls">';
							cStr += '<button class="btn btn-primary btn-rounded"><span class="fa fa-folder-open-o"></span></button>';
							cStr += '</div>';
							cStr += '</a>';
						}
						$("#xSearMembList").html( cStr );
					}
				}).fail(function() {
					//alert("C");
					oTemp.total = 0;
					$("#xTeacSearchError").show();
					$("#xTeacSearchFound").hide();
				});	
				pageLoadingFrame('hide','v2');
			}				
		}
		
		function _searchMemberForEdit() {
			//alert(9);
			var c = oUser.rows[ 0 ].changwad;
			var c1 = oUser.rows[ 0 ].amphur;
			var c2 = $("#xSearchMemberText1").val().trim();
			var nLen = c2.length;
			var n = 0;
			if ( true ) {
				pageLoadingFrame('show','v2');
				//$("#xTeacSearch").hide();					
				var cParam = cWWWHeader + "php/controlDB.php?method=searchMemberForEdit& param1=" + c + "& param2=" + c1 + "& param3=" + c2;
				//var cParam = 'http://www.mkorsornor.com/php/controlDB.php?method=searchMemberForEdit& param1=48000& param2=4817000& param3=5923000189';
				var oTemp = new Object();
				$.get( cParam )
				.success(function(data) {	
					//$("#xTeacSearch").hide();//alert( data );
					oTemp = JSON.parse( data );
					$("#xCode").html( $("#xSearchMemberText1").val() );	
					if ( oTemp.total == 0 ) {//สร้างใหม่
					}
//เติมข้อมูล			
			var nLen = oChangwad.changwad.length;//alert( "A=" );alert( nLen );alert("B=");
			$("#modal_confirm_edit").find("#xTeacChangwad2").empty();
			for ( i = 0; i< nLen; i++ ) {
				$('#xTeacChangwad2').append($('<option>', { value: oChangwad.changwad[i].code,text: "กศน.จังหวัด"+oChangwad.changwad[i].name }));
			}
//อ่านอำเภอ
			var cChangwad = oUser.rows[ n ].changwad ;
			var cParam = cWWWHeader + "./assets/data/"+cChangwad+".json";//alert( cParam );
			var nTambol = 0;
			var nAmphur = 0;
			$.get( cParam )
			.success(function(data) {
				//alert( typeof data );
				oOrganize1 = data;
				//oOrganize1 = JSON.parse( data );	
				var nLen = oOrganize1.amphurs.length;
				$("#modal_confirm_edit").find("#xTeacAmphur2").empty();	
				for ( var i = 0; i< nLen; i++ ) {
					$("#modal_confirm_edit").find('#xTeacAmphur2').append($('<option>', { value: oOrganize1.amphurs[i].code,text: "กศน.อำเภอ"+oOrganize1.amphurs[i].name }));
					if ( oUser.rows[ n ].amphur == oOrganize1.amphurs[i].code ) {
						nTambol = i;
						nAmphur = i;
					}
				}
				//alert( nAmphur );
				$('#xTeacChangwad2').val( c );//alert( c );
				$("#modal_confirm_edit").find("#xTeacAmphur2").val( c1 );
				nLen = oOrganize1.amphurs[ nAmphur ].tambols.length;
				$("#modal_confirm_edit").find("#xTeacTambol2").empty();	
				for ( var i = 0; i< nLen; i++ ) {
					$("#modal_confirm_edit").find('#xTeacTambol2').append($('<option>', { value: oOrganize1.amphurs[ nAmphur ].tambols[ i ].code,text: "กศน.ตำบล"+oOrganize1.amphurs[ nAmphur ].tambols[ i ].name }));
				}
				nLen = oPrename.prenames.length;//alert( nLen );
				$("#modal_confirm_edit").find("#xTeacEditPrename2").empty();	
				for ( var i = 0; i< nLen; i++ ) {
					$("#modal_confirm_edit").find('#xTeacEditPrename2').append($('<option>', { value: oPrename.prenames[ i ].code,text: oPrename.prenames[ i ].prename }));
				}
			
			nLen = oChangwad.changwad.length;
			//$("#modal_confirm_edit").find("#xTeacChangwad2").empty();
			//for ( i = 0; i< nLen; i++ ) {
				//$("#modal_confirm_edit").find('#xTeacChangwad2').append($('<option>', { value: oChangwad.changwad[i].code,text: "กศน.จังหวัด"+oChangwad.changwad[i].name }));
			//}
			//$("#modal_confirm_edit").find("#xTeacChangwad2").val( oDummy.rows[ n ].changwad );
			//$("#modal_confirm_edit").find("#xTeacAmphur2").val( oDummy.rows[ n ].amphur );
			$("#modal_confirm_edit").find("#xTeacTambol2").val( oTemp.rows[ n ].tambol );
			$("#modal_confirm_edit").find("#xTeacEditPrename2").val( oTemp.rows[ n ].prename_code );//alert( oDummy.rows[ n ].prename_code );
			$("#modal_confirm_edit").find("#xTeacEditName2").val( oTemp.rows[ n ].name );
			$("#modal_confirm_edit").find("#xTeacEditSurname2").val( oTemp.rows[ n ].surname );
			$("#modal_confirm_edit").find("#xTeacEditNickname2").val( oTemp.rows[ n ].nickname );
			$("#modal_confirm_edit").find("#xTeacEditMobile2").val( oTemp.rows[ n ].mobile );
			$("#modal_confirm_edit").find("#xTeacEditEmail2").val( oTemp.rows[ n ].email );
			$("#modal_confirm_edit").find("#xTeacEditBorn2").val( oTemp.rows[ n ].born );
			$("#modal_confirm_edit").find("#xTeacEditSex2").val( oTemp.rows[ n ].sex );
		});
			//$("#xTeacherSetup").hide();//ซ่อน menu หลัก
					oDummy = JSON.parse( data );	
					if ( oDummy.total == 0 ) {
						$("#modal_confirm_edit").find("#smallModalHead").html("เพิ่มข้อมูลนักศึกษาใหม่");
						var nLen = oChangwad.changwad.length;
						$("#xTeacChangwad2").empty();
						var cChangwad = oUser.rows[0].changwad;
						var cAmphur = oUser.rows[0].amphur;
						for ( i = 0; i< nLen; i++ ) {
							$('#xTeacChangwad2').append($('<option>', { value: oChangwad.changwad[i].code,text: "กศน.จังหวัด"+oChangwad.changwad[i].name }));
						}
						var cParam = cWWWHeader + "./assets/data/"+cChangwad+".json";
						//alert( cParam );
						$.get( cParam )
						.success(function(data) {
							//alert( data );
							//oOrganize = JSON.parse( data );	
							oOrganize = data;
						}).fail(function() {
						});	
						//alert( data );
						nLen = oOrganize.amphurs.length;
						for ( i = 0; i< nLen; i++ ) {
							$('#xTeacAmphur2').append($('<option>', { value: oOrganize.amphurs[i].code,text: "กศน.จังหวัด"+oOrganize.amphurs[i].name }));
						}						
						//alert( "cAmphur" );
						$("#xTeacChangwad2").value(cChangwad);
						$("#xTeacAmphur2").value(cAmphur);
						
					}  else {//>1 รายการ
						$("#modal_confirm_edit").find("#smallModalHead").html("แก้ไขข้อมูลนักศึกษา");
					}
				}).fail(function() {
					//alert("C");
					oTemp.total = 0;
					$("#xTeacSearchError").show();
					$("#xTeacSearchFound").hide();
				});	
				pageLoadingFrame('hide','v2');
			}				
		}
		
		function _saveTeacEdit2() {
			var oTemp = new Object();
			oTemp.type = "01";//นักศึกษา
			oTemp.idsim = "";
			oTemp.idcode = $('#xWorkspace4').find('#xSearchMemberText1').val();;//xSearchMemberText1
			oTemp.status = "A";
			oTemp.prename_code = $('#xWorkspace4').find('#xTeacEditPrename2').val();
			oTemp.changwad = $('#xWorkspace4').find('#xTeacChangwad2').val();
			oTemp.amphur = $('#xWorkspace4').find('#xTeacAmphur2').val();
			oTemp.tambol = $('#xWorkspace4').find('#xTeacTambol2').val();
			oTemp.firstname = $('#xWorkspace4').find('#xTeacEditName2').val();
			oTemp.lastname = $('#xWorkspace4').find('#xTeacEditSurname2').val();
			oTemp.nickname = $('#xWorkspace4').find('#xTeacEditNickname2').val();
			oTemp.mobile = $('#xWorkspace4').find('#xTeacEditMobile2').val();
			oTemp.email = $('#xWorkspace4').find('#xTeacEditEmail2').val();
			oTemp.born = $('#xWorkspace4').find('#xTeacEditBorn2').val();
			oTemp.gender_code = $('#xWorkspace4').find('#xTeacEditSex2').val();
			pageLoadingFrame('show','v2');
			$.post(cWWWHeader + 'php/controlDB.php?method=saveMemberEdit', { param1: JSON.stringify(oTemp)}, function(response){
				//alert( response );
				pageLoadingFrame('hide','v2');
			})
			
		}
		
		function _saveMembEdit() {
			var oTemp = new Object();
			oTemp.fb_code = oUser.rows[0].fb_code;
			oTemp.fb_name = oUser.rows[0].fb_name;
			oTemp.type = oUser.rows[0].type;
			oTemp.idsim = oUser.rows[0].idsim;
			oTemp.idcode = oUser.rows[0].idcode;//alert(oTemp.idcode);
			oTemp.status = "A";
			oTemp.prename_code = $('#xWorkspace4').find('#xMembEditPrename').val();
			oTemp.changwad = $('#xWorkspace4').find('#xMembChangwad').val();
			oTemp.amphur = $('#xWorkspace4').find('#xMembAmphur').val();
			oTemp.tambol = $('#xWorkspace4').find('#xMembTambol').val();
			oTemp.firstname = $('#xWorkspace4').find('#xMembEditName').val();
			oTemp.lastname = $('#xWorkspace4').find('#xMembEditSurname').val();
			oTemp.nickname = $('#xWorkspace4').find('#xMembEditNickname').val();
			oTemp.mobile = $('#xWorkspace4').find('#xMembEditMobile').val();
			oTemp.email = $('#xWorkspace4').find('#xMembEditEmail').val();
			oTemp.born = $('#xWorkspace4').find('#xMembEditBorn').val();
			oTemp.gender_code = $('#xWorkspace4').find('#xMembEditSex').val();
			pageLoadingFrame('show','v2');
			$.post(cWWWHeader + 'php/controlDB.php?method=saveMemberEdit', { param1: JSON.stringify(oTemp)}, function(response){
				oUser.rows[0].fb_code = oTemp.fb_code;
				oUser.rows[0].fb_name = oTemp.fb_name;
				oUser.rows[0].type = oTemp.type;
				oUser.rows[0].idsim = oTemp.idsim;
				oUser.rows[0].idcode = oTemp.idcode;
				oUser.rows[0].status = oTemp.status;
				oUser.rows[0].prename_code = oTemp.prename_code;
				oUser.rows[0].changwad = oTemp.changwad;
				oUser.rows[0].amphur = oTemp.amphur;
				oUser.rows[0].tambol = oTemp.tambol;
				oUser.rows[0].firstname = oTemp.firstname;
				oUser.rows[0].lastname = oTemp.lastname;
				oUser.rows[0].nickname = oTemp.nickname;
				oUser.rows[0].mobile = oTemp.mobile;
				oUser.rows[0].email = oTemp.email;
				oUser.rows[0].born = oTemp.born;
				oUser.rows[0].gender_code = oTemp.gender_code;
				pageLoadingFrame('hide','v2');
				alert("บันทึกข้อมูลเรียบร้อยแล้ว");
			})
			
		}
		function _editTambolMember() {
			_closeTeacherAll();
			$("#xTeacBack").show();
			$("#xTeacherMainmenu1").hide();
			$("#xTeacherSetup").hide();
			//$("#xMemberMainmenu1").show();
			//$("#xSearchMemberText1").val("");
			
		}
		
		function _checkTable( c ) {
			var cParam = cWWWHeader + "php/controlDB.php?method=checkTable& param1=" + c;
			var oTemp = new Object();
			$.get( cParam )
			.success(function(data) {
				oTemp.total=1;
			}).fail(function() {
				oTemp.total = 0;
			});	
			return oTemp;
		}
		
		function _editExamMember() {
			_closeTeacherAll();
			$("#xTeacExamEdit").show();
			$("#xTeacBack").show();
			var cName =  "mksn" + "_" + oUser.rows[0].lang_code + "_" + oUser.rows[0].changwad + "_" + oUser.rows[0].amphur + "_" + oUser.rows[0].tambol + "_" + oUser.rows[0].id + "_exam";
			var nTemp = _checkTable( cName );
			if 	( nTemp == 0 ) {
				//_php_function("createExam");
			}
		}
		
		function _editEbook() {
			$("#xTeacherMainmenu1").hide();
			$("#xTeacEditEbook").show();
			$("#xTeacEditEbook1").show();
			$("#xTeacBack").show();
		}
		
		function _editTeacher() {
			var i;
			//pageLoadingFrame('show','v2');
			var cFname1 = cWWWHeader + "data/"+oUser.rows[0].changwad+"/"+oUser.rows[0].amphur+"/img/"+oUser.rows[0].id+".jpg";		
			var cFname2 = cWWWHeader + "data/"+oUser.rows[0].changwad+"/"+oUser.rows[0].amphur+"/img/"+oUser.rows[0].id+".txt";		
			if ( true ) {
				//alert( '<img src="'+cFname1+'" width="200" height="200"/>' );
				$('#xUser_Image').html( '<img src="'+cFname1+'" width="200" height="200"/>' );
				/*
				$('#xUser_Image').css({
					"-webkit-transform": "rotate(270deg)",
					"-moz-transform": "rotate(270deg)",
					"transform": "rotate(270deg)"
				});		
				*/
			} else {
				$('#xUser_Image').html( '<img src="./assets/images/gallery/person.jpg" width="200" height="200"/>' );
			}
			_closeTeacherAll();
			$("#xTeacEdit").show();
			$("#xTeacBack").show();
			var nLen = oChangwad.changwad.length;
			$("#xTeacChangwad").empty();
			for ( i = 0; i< nLen; i++ ) {
				$('#xTeacChangwad').append($('<option>', { value: oChangwad.changwad[i].code,text: "กศน.จังหวัด"+oChangwad.changwad[i].name }));
			}
			$("#xTeacEditPrename").empty();
			nLen = oPrename.prenames.length;
			for ( i = 0; i< nLen; i++ ) {
				$('#xTeacEditPrename').append($('<option>', { value: oPrename.prenames[i].code,text: oPrename.prenames[i].prename }));
			}
			//alert(77);
			$("#xTeacEditPosition").empty();
			nLen = oPosition.positions.length;
			for ( i = 0; i< nLen; i++ ) {
				$('#xTeacEditPosition').append($('<option>', { value: oPosition.positions[i].code,text: oPosition.positions[i].position }));
			}
			$("#xTeacEditDegree").empty();
			nLen = oDegree.degrees.length;
			for ( i = 0; i< nLen; i++ ) {
				$('#xTeacEditDegree').append($('<option>', { value: oDegree.degrees[i].code,text: oDegree.degrees[i].degree }));
			}
			$("#xTeacEditSex").empty();
			nLen = oGender.genders.length;
			for ( i = 0; i< nLen; i++ ) {
				$('#xTeacEditSex').append($('<option>', { value: oGender.genders[i].code,text: oGender.genders[i].gender }));
			}
			$("#xTeacChangwad").val( oUser.rows[0].changwad );
			$("#xTeacEditPrename").val( oUser.rows[0].prename_code );
			$("#xTeacEditName").val( oUser.rows[0].name );
			$("#xTeacEditSurname").val( oUser.rows[0].surname );
			$("#xTeacEditNickname").val( oUser.rows[0].nickname );
			$("#xTeacEditBorn").val( oUser.rows[0].born );
			$("#xTeacEditSex").val( oUser.rows[0].gender_code );
			$("#xTeacEditPosition").val( oUser.rows[0].position_code );
			$("#xTeacEditDegree").val( oUser.rows[0].degree_code );
			$("#xTeacEditMobile").val( oUser.rows[0].mobile );
			$("#xTeacEditEmail").val( oUser.rows[0].email );
			_getChangwadPopup( );
			
			pageLoadingFrame('hide','v2');
		}	
		
		function _saveTeacEdit() {
			var oTemp = new Object();
			oTemp.id = oUser.rows[0].id;
			oTemp.fb_code = oUser.rows[0].fb_code;
			oTemp.fb_name = oUser.rows[0].fb_name;
			oTemp.changwad = $('#xWorkspace4').find('#xTeacChangwad').val();
			oTemp.amphur = $('#xWorkspace4').find('#xTeacAmphur').val();
			oTemp.tambol = $('#xWorkspace4').find('#xTeacTambol').val();
			oTemp.prename_code = $('#xWorkspace4').find('#xTeacEditPrename').val();
			oTemp.name = $('#xWorkspace4').find('#xTeacEditName').val();
			oTemp.surname = $('#xWorkspace4').find('#xTeacEditSurname').val();
			oTemp.nickname = $('#xWorkspace4').find('#xTeacEditNickname').val();
			oTemp.mobile = $('#xWorkspace4').find('#xTeacEditMobile').val();
			oTemp.email = $('#xWorkspace4').find('#xTeacEditEmail').val();
			oTemp.born = $('#xWorkspace4').find('#xTeacEditBorn').val();
			oTemp.gender_code = $('#xWorkspace4').find('#xTeacEditSex').val();
			oTemp.position = $('#xWorkspace4').find('#xTeacEditPosition').val();
			oTemp.degree = $('#xWorkspace4').find('#xTeacEditDegree').val();
			pageLoadingFrame('show','v2');
			$.post(cWWWHeader + 'php/controlDB.php?method=saveTeacherEdit', { param1: JSON.stringify(oTemp)}, function(response){
				pageLoadingFrame('hide','v2');
				//alert( response );
				oUser.rows[ 0 ].changwad = oTemp.changwad;
				oUser.rows[ 0 ].amphur = oTemp.amphur;
				oUser.rows[ 0 ].tambol = oTemp.tambol;
				oUser.rows[ 0 ].prename_code = oTemp.prename;
				oUser.rows[ 0 ].name = oTemp.name;
				oUser.rows[ 0 ].surname = oTemp.surname;
				oUser.rows[ 0 ].nickname = oTemp.nickname;
				oUser.rows[ 0 ].mobile = oTemp.mobile;
				oUser.rows[ 0 ].email = oTemp.email;
				oUser.rows[ 0 ].born = oTemp.born;
				oUser.rows[ 0 ].gender = oTemp.gender;
				oUser.rows[ 0 ].position = oTemp.position;
				oUser.rows[ 0 ].degree = oTemp.degree;
			})
		}

		
		function _getChangwadPopup( ) { //ถ้าเปลี่ยนจังหวัด ให้ reset ทุกอย่างใหม่หมด			
			var cChangwad = $('#xTeacChangwad').val();//oUser.rows[0].changwad = cChangwad;
			var cParam = cWWWHeader + "./assets/data/"+cChangwad+".json";//alert( cParam );
			var nTambol = 0;
			$.get( cParam )
			.success(function(data) {
				//alert( data );
				//oOrganize = JSON.parse( data );	
				oOrganize = data;	
				var nLen = oOrganize.amphurs.length;
				$("#xTeacAmphur").empty();	
				for ( var i = 0; i< nLen; i++ ) {
					$('#xTeacAmphur').append($('<option>', { value: oOrganize.amphurs[i].code,text: "กศน.อำเภอ"+oOrganize.amphurs[i].name }));
					if ( oUser.rows[0].amphur == oOrganize.amphurs[i].code ) {
						nTambol = i;
					}
				}
				//if ( oUser.rows[0].changwad != cChangwad ) {
				//	$('#xTeacAmphur').value( cChngwad + "00" );					
				//}
				$("#xTeacTambol").empty();
				nLen = oOrganize.amphurs[ nTambol ].tambols.length;
				for ( var i = 0; i< nLen; i++ ) {
					$('#xTeacTambol').append($('<option>', { value: oOrganize.amphurs[ nTambol ].tambols[ i ].code,text: "กศน.ตำบล"+oOrganize.amphurs[ nTambol ].tambols[ i ].name }));
				}
				if ( oUser.rows[0].changwad == cChangwad ) {
					//alert("A");
					$("#xTeacAmphur").val( oUser.rows[0].amphur );
					$("#xTeacTambol").val( oUser.rows[0].tambol );
				} else {
					//alert("B");
					$("#xTeacAmphur").val( oOrganize.amphurs[ 0 ].code );
					$("#xTeacTambol").val( oOrganize.amphurs[ 0 ].tambols[ 0 ].code );
				}
			}).fail(function() {
			});	
		}
		
		function _getMembChangwadPopup( ) { //ถ้าเปลี่ยนจังหวัด ให้ reset ทุกอย่างใหม่หมด			
			var cChangwad = $('#xMembChangwad').val();//oUser.rows[0].changwad = cChangwad;
			var cParam = cWWWHeader + "./assets/data/"+cChangwad+".json";//alert( cParam );
			var nTambol = 0;
			$.get( cParam )
			.success(function(data) {
				//alert( data );
				//oOrganize = JSON.parse( data );	
				oOrganize = data;	
				var nLen = oOrganize.amphurs.length;
				$("#xMembAmphur").empty();	
				for ( var i = 0; i< nLen; i++ ) {
					$('#xMembAmphur').append($('<option>', { value: oOrganize.amphurs[i].code,text: "กศน.อำเภอ"+oOrganize.amphurs[i].name }));
					if ( oUser.rows[0].amphur == oOrganize.amphurs[i].code ) {
						nTambol = i;
					}
				}
				//if ( oUser.rows[0].changwad != cChangwad ) {
				//	$('#xTeacAmphur').value( cChngwad + "00" );					
				//}
				$("#xMembTambol").empty();
				nLen = oOrganize.amphurs[ nTambol ].tambols.length;
				for ( var i = 0; i< nLen; i++ ) {
					$('#xMembTambol').append($('<option>', { value: oOrganize.amphurs[ nTambol ].tambols[ i ].code,text: "กศน.ตำบล"+oOrganize.amphurs[ nTambol ].tambols[ i ].name }));
				}
				if ( oUser.rows[0].changwad == cChangwad ) {
					//alert("A");
					$("#xMembAmphur").val( oUser.rows[0].amphur );
					$("#xMembTambol").val( oUser.rows[0].tambol );
				} else {
					//alert("B");
					$("#xMembAmphur").val( oOrganize.amphurs[ 0 ].code );
					$("#xMembTambol").val( oOrganize.amphurs[ 0 ].tambols[ 0 ].code );
				}
			}).fail(function() {
			});	
		}
		function _getAmphurPopup( n ) {
			oOrganize.amphur = n;
			$("#xTeacTambol").empty();
			var nLen = oOrganize.amphurs[ n ].tambols.length;
			for ( var i = 0; i< nLen; i++ ) {
				$('#xTeacTambol').append($('<option>', { value: oOrganize.amphurs[ n ].tambols[ i ].code,text: "กศน.ตำบล"+oOrganize.amphurs[ n ].tambols[ i ].name }));
				if ( oOrganize.amphurs[ n ].tambols[ i ].code == oUser.rows[0].tambol ) {
					$("#xTeacTambol").val( oOrganize.amphurs[ n ].tambols[ i ].code );
				}
			}
		}
		function _getMembAmphurPopup( n ) {
			oOrganize.amphur = n;
			$("#xMembTambol").empty();
			var nLen = oOrganize.amphurs[ n ].tambols.length;
			for ( var i = 0; i< nLen; i++ ) {
				$('#xMembTambol').append($('<option>', { value: oOrganize.amphurs[ n ].tambols[ i ].code,text: "กศน.ตำบล"+oOrganize.amphurs[ n ].tambols[ i ].name }));
				if ( oOrganize.amphurs[ n ].tambols[ i ].code == oUser.rows[0].tambol ) {
					$("#xMembTambol").val( oOrganize.amphurs[ n ].tambols[ i ].code );
				}
			}
		}

		function _getMembTambolPopup( n ) {
			oOrganize.tambol = n;
		}
		
		function _getTambolPopup( n ) {
			oOrganize.tambol = n;
		}
		
		function _checkByList() {
			var c1 = oUser.rows[ 0 ].changwad;
			var c2 = oUser.rows[ 0 ].amphur;
			var c3 = oUser.rows[ 0 ].tambol;
			$("#xTeacCheck").hide();
			$("#xTeacBack").hide();
			$("#xTeacBack2").hide();
			$("#xTeacBack3").hide();
			$("#xTeacBack4").hide();
				//pageLoadingFrame('hide','v2');
			var nLen = c2.length;
			
				pageLoadingFrame('show','v2');
				//$("#xTeacSearch").hide();					
				var cParam = cWWWHeader + "php/controlDB.php?method=getMemberList& param1=" + c1 + "& param2= " + c2 + "& param3=" + c3;
				var cParam = 'http://www.mkorsornor.com/php/controlDB.php?method=getMemberList&%20param1=48000&%20param2=4817000&%20param3=02';
				//var oTemp = new Object();
//alert( cParam );				
				$.get( cParam )
				.success(function(data) {
					//$("#xTeacSearch").hide();
					//oTemp = JSON.parse( data );	
					//alert( data );
					oDummy = JSON.parse( data );	
					if ( oDummy.total == 0 ) {
						//alert("A");
						$("#xTeacSearchError").show();
						$("#xTeacSearchFound").hide();
						$("#xTeacBack").hide();
						$("#xTeacSearchMultiFound").hide();
						//$("#xTeacBack2").show();
					}  else {//>1 รายการ
						$("#xTeacSearchMultiFound").show();
						$("#xTeacSearchError").hide();
						$("#xTeacSearchFound").hide();
						$("#xTeacBack").hide();
						//$("#xTeacBack2").show();
						var cStr = "";
						for ( var i = 0 ; i< oDummy.total; i++ ) {
							oDummy.rows[i].lChecked = true;
							cStr += '<a href="javascript:void(0)" class="list-group-item" onClick="_myCheck('+i+')">';
							cStr += '<div class="list-group-status status-online"></div>';
							cStr += '<img src="./assets/images/gallery/person.jpg" class="pull-left" alt=""/>';
							cStr += '<span class="contacts-title">'+oDummy.rows[i].name+" "+oDummy.rows[i].surname+'</span>';
							cStr += '<p>นักศึกษา</p>';
							cStr += '<div class="list-group-controls" id="xDummyDummy'+i+'">';
							cStr += '<button class="btn btn-success btn-rounded"><span class="fa fa-check"></span></button>';
							cStr += '</div>';
							cStr += '</a>';
						}
						$("#xSearMembList").html( cStr );
					}
				}).fail(function() {
					//alert("C");
					oTemp.total = 0;
					$("#xTeacSearchError").show();
					$("#xTeacSearchFound").hide();
				});	
				pageLoadingFrame('hide','v2');
			$("#xTeacBack4").show();
							
		}
		
		function _myCheck( n ) {
			oDummy.rows[ n ].lChecked = !oDummy.rows[n].lChecked;
			if ( oDummy.rows[n].lChecked ) {
				$("#xDummyDummy"+n).html('<button class="btn btn-success btn-rounded"><span class="fa fa-check"></span></button>');
			} else {
				$("#xDummyDummy"+n).html('<button class="btn btn-danger btn-rounded"><span class="fa fa-times"></span></button>');
			}
		}
		
		function _checkMember() {
			$("#xTeacherMainmenu1").hide();
			$("#xTeacCheck").show();
			$("#xTeacBack").show();
		}
		
		function _backTeacMain() {
			_closeTeacherAll();
			$("#xWorkspace4").find("#xTeacherMainmenu1").show();
		}
		
		function _backRegMain( n ) {
			if ( n == 2 ) {
				$("#xRegisterPage1").show();
				$("#xRegisterPage2").hide();
				$("#xRegisterPage3").hide();
				
				$("#xRegBack2").hide();
				$("#xRegBack1").show();
			} else {
				_logout();
				window.location.assign("index.html");
			}
		}
		
		function _searchMember() {
			$("#xTeacherMainmenu1").hide();
			$("#xTeacSearch").show();
			$("#xTeacBack").show();
		}
		
		function _findMember() {
		}
		
		function _closeNoty() {
			setInterval(function(){ $.noty.closeAll(); }, 3000);			
		}

		function _showSuperAdmin() {
			$('#xWorkspace4').find('#xUserBookPosition').html("ขอคารวะ...SUPERADMIN" );
			$('#xWorkspace4').find('#xSetSuperInfo').show();
		}
		function _showAdminAmphur() {
			var cName = oUser.rows[ 0 ].academy_name;cName = "กศน.อำเภอเรณูนคร";
			$('#xWorkspace4').find('#xUserBookPosition').html( "ผู้ดูแลระบบ "+ cName );
			$('#xWorkspace4').find('#xSetAdmAInfo').show();
		}
		function _showTeacher() {
			var cName = oUser.rows[ 0 ].academy_name;cName = "กศน.อำเภอเรณูนคร";
			$('#xWorkspace4').find('#xUserBookPosition').html( "ครู "+ cName );
			$('#xWorkspace4').find('#xTeacherSetup').show();
		}	
		
		function _showMember() {
			var cName = oUser.rows[ 0 ].academy_name;cName = "กศน.อำเภอเรณูนคร";
			$('#xWorkspace4').find('#xUserBookPosition').html("นักศึกษา "+ cName);
			$('#xWorkspace4').find('#xMemberSetup').show();
		}
		
		function _editMember() {
			//alert(123);
			$('#xMemberMainmenu1').hide();
		}
		
		function _backMembMain() {
			$('#xMemberMainmenu1').show();
			$('#xMemberEdit').hide();
		}
		function _editMember1() {
			var i;
			//pageLoadingFrame('show','v2');
			var cFname1 = cWWWHeader + "data/"+oUser.rows[0].changwad+"/"+oUser.rows[0].amphur+"/img/"+oUser.rows[0].id+".jpg";		
			var cFname2 = cWWWHeader + "data/"+oUser.rows[0].changwad+"/"+oUser.rows[0].amphur+"/img/"+oUser.rows[0].id+".txt";		
			//alert(123);
			//alert( "oUser.rows[0].gender_code =>"+oUser.rows[0].gender_code );
			$('#xMemberMainmenu1').hide();
			$('#xMemberEdit').show();
			if ( true ) {
				$('#xMember_Image').html( '<img src="'+cFname1+'" width="200" height="200"/>' );
				/*
				$('#xUser_Image').css({
					"-webkit-transform": "rotate(270deg)",
					"-moz-transform": "rotate(270deg)",
					"transform": "rotate(270deg)"
				});		
				*/
			} else {
				$('#xMember_Image').html( '<img src="./assets/images/gallery/person.jpg" width="200" height="200"/>' );
			}
			//------------------------
			var nLen = oPrename.prenames.length;
			$("#xMembEditPrename").empty();	
			for ( var i = 0; i< nLen; i++ ) {
				$('#xMembEditPrename').append($('<option>', { value: oPrename.prenames[ i ].code,text: oPrename.prenames[ i ].prename }));
			}
			nLen = oGender.genders.length;
			$("#xMembEditSex").empty();	
			for ( var i = 0; i< nLen; i++ ) {
				$('#xMembEditSex').append($('<option>', { value: oGender.genders[ i ].code,text: oGender.genders[ i ].gender }));
			}
			nLen = oChangwad.changwad.length;
			$("#xMembChangwad").empty();
			for ( i = 0; i< nLen; i++ ) {
				$('#xMembChangwad').append($('<option>', { value: oChangwad.changwad[i].code,text: "กศน.จังหวัด"+oChangwad.changwad[i].name }));
			}
			var cParam = cWWWHeader + "./assets/data/"+oUser.rows[0].changwad+".json";
			
			var oTemp = new Object();
			$.get( cParam )
			.success(function(data) {
				oOrganize = data;
				var nLen = oOrganize.amphurs.length;
				for ( var i = 0; i< nLen; i++ ) {
					$('#xMembAmphur').append($('<option>', { value: oOrganize.amphurs[i].code,text: "กศน.อำเภอ"+oOrganize.amphurs[i].name }));
					if ( oUser.rows[0].amphur == oOrganize.amphurs[i].code ) {
						nTambol = i;
					}
				}
				$("#xMembTambol").empty();
				nLen = oOrganize.amphurs[ nTambol ].tambols.length;
				for ( var i = 0; i< nLen; i++ ) {
					$('#xMembTambol').append($('<option>', { value: oOrganize.amphurs[ nTambol ].tambols[ i ].code,text: "กศน.ตำบล"+oOrganize.amphurs[ nTambol ].tambols[ i ].name }));
				}
				//alert( "cAmphur" );
				$("#xMembAmphur").val( oUser.rows[0].amphur );			
				$("#xMembChangwad").val( oUser.rows[0].changwad );
				$("#xMembTambol").val( oUser.rows[0].tambol );
				$("#xMembEditPrename").val( oUser.rows[ 0 ].prename_code );
				$("#xMembEditName").val( oUser.rows[ 0 ].name );
				$("#xMembEditSurname").val( oUser.rows[ 0 ].surname );
				$("#xMembEditNickname").val( oUser.rows[ 0 ].nickname );
				$("#xMembEditMobile").val( oUser.rows[ 0 ].mobile );
				$("#xMembEditEmail").val( oUser.rows[ 0 ].email );
				$("#xMembEditBorn").val( oUser.rows[ 0 ].born );
				$("#xMembEditSex").val( oUser.rows[ 0 ].gender_code );//alert(oUser.rows[ 0 ].gender_code);
				$("#xWorkspace2").show();
			});
		}
	//ตัวอย่าง การบันทึกแบบ Object	
		function _deleteAdmin() {
			var oTemp = new Object();
			oTemp.changwad = $('#xWorkspace4').find('#xAcademyChangwad').val();//alert( oTemp.changwad );
			oTemp.amphur = $('#xWorkspace4').find('#xAcademyAmphur').val();//alert( oTemp.amphur );
			oTemp.fbname = $('#xWorkspace4').find('#xFacebookName').val();//alert( oTemp.fbname );
			$.post(cWWWHeader+'php/controlDB.php?method=deleteAdmin', { param1: JSON.stringify(oTemp)}, function(response){
				oTemp = JSON.parse(response);//alert( response );alert(oTemp.name);
				$('#xWorkspace4').find('#xTableName').html( "" );
				$('#xWorkspace4').find('#xTableSurname').html( "" );
				$('#xWorkspace4').find('#xTableNickname').html( "" );
				$('#xWorkspace4').find('#xTableFBcode').html( "" );
			})
		}
		
		function _saveAdmin() {
			var oTemp = new Object();
			oTemp.changwad = $('#xWorkspace4').find('#xAcademyChangwad').val();//alert( oTemp.changwad );
			oTemp.amphur = $('#xWorkspace4').find('#xAcademyAmphur').val();//alert( oTemp.amphur );
			oTemp.fbname = $('#xWorkspace4').find('#xFacebookName').val();//alert( oTemp.fbname );
			$.post(cWWWHeader+'php/controlDB.php?method=saveAdmin', { param1: JSON.stringify(oTemp)}, function(response){
				oTemp = JSON.parse(response);//alert( response );alert(oTemp.name);
				$('#xWorkspace4').find('#xTableName').html( oTemp.name );
				$('#xWorkspace4').find('#xTableSurname').html( oTemp.surname );
				$('#xWorkspace4').find('#xTableNickname').html( oTemp.nickname );
				$('#xWorkspace4').find('#xTableFBcode').html( oTemp.fb_code );
			})

		}

		function _checkFile( cName ) {
	/*		
		   var img = new Image();
		   var lFound = true;
		   img.src = cName;
		   if ( img.height == 0 ) lFound = false;
		   return lFound;		
	*/

		if( cName ){
			var req = new XMLHttpRequest();
			req.open('GET', cName, false);
			req.send();
			return req.status==200;
		} else {
			return false;
		}

	/*	
	$('<img src="'+ cName +'">').load(function() {
		return true;
	}).bind('error', function() {
		return false;
	});
	*/
	/*	
		try {
			$.ajax({
				url:cName,
				type:'HEAD',
				error: function()
				{
					return true;
				},
				success: function()
				{
					return false;
				}
			});
		} catch(err){
			return false;
		}
	*/	
	}
		
		function _saveImage( c ) {
			var cName= c;
			var nLen = cName.length;
			var nScope = 5;
			var nCount = parseInt( nLen / nScope );
			var nDiv = nLen % nScope;
			var nPnt = 1;
			var oFile = new Object();

			if ( nDiv > 0 ) ++nCount;
			oFile.data = new Array( nCount );

			for ( var i = 0; i< nCount; i++ ) {
					oFile.data[ i] = cName.substr( nPnt - 1, nScope );
				nPnt += nScope;
			}
			$("#submit_image").html( c );
			var cParam = cWWWHeader+"php/upload_file.php& param1="+oUser.rows[0].changwad+"& param2="+oUser.rows[0].amphur+"& param3="+oUser.rows[0].id+"& param4=" +c;
			//alert( cParam );
			pageLoadingFrame('show','v2');
			$.get( cParam )
			.success(function(data) {
				pageLoadingFrame('hide','v2');
				//alert( data );
			}).fail(function() {
				pageLoadingFrame('hide','v2');
				//noty({text: 'ไม่พบรหัส  mKorsornor จังหวัดที่ระบุ', layout: 'topRight', type: 'error'});
				//_closeNoty();	
			});
			
		}
		
		function _test1( c ) {
			var cFname = "../data/"+oUser.rows[0].changwad+"/"+oUser.rows[0].amphur+"/img/"+oUser.rows[0].id+".jpg";
			var $i = $( '#xFile' ), // Put file input ID here
				input = $i[0]; // Getting the element from jQuery
			var myURL = window.URL || window.webkitURL;
			var tmppath = myURL.createObjectURL(input.files[0]);
			pageLoadingFrame('show','v2');
			$('#xUser_Image').html( '<img src="'+tmppath+'" width="200" height="200"/>' );
	var fd = new FormData();//alert( cFname );
	fd.append('fname', cFname);
	fd.append('data', c );
	$.ajax({
		type: 'POST',
		url: cWWWHeader+'php/upload_file.php',
		data: fd,
		processData: false,
		contentType: false
	}).done(function(data) {
		   pageLoadingFrame('hide','v2');
	});
		}
		function _test2( c ) {
			var cFname = "../data/"+oUser.rows[0].changwad+"/"+oUser.rows[0].amphur+"/img/"+oUser.rows[0].id+".jpg";
			var $i = $( '#xFile1' ), // Put file input ID here
				input = $i[0]; // Getting the element from jQuery
			var myURL = window.URL || window.webkitURL;
			var tmppath = myURL.createObjectURL(input.files[0]);
			pageLoadingFrame('show','v2');
			$('#xMember_Image').html( '<img src="'+tmppath+'" width="200" height="200"/>' );
	var fd = new FormData();//alert( cFname );
	fd.append('fname', cFname);
	fd.append('data', c );
	$.ajax({
		type: 'POST',
		url: cWWWHeader+'php/upload_file.php',
		data: fd,
		processData: false,
		contentType: false
	}).done(function(data) {
		   pageLoadingFrame('hide','v2');
	});
		}
		
		function _selectImage() {

			if ( ! window.FileReader ) {
				return alert( 'FileReader API is not supported by your browser.' );
			}
			var $i = $( '#xFile' ), // Put file input ID here
				input = $i[0]; // Getting the element from jQuery
			if ( input.files && input.files[0] ) {
				file = input.files[0]; // The file
				//alert( file.getAbsolutePath() );
				fr = new FileReader(); // FileReader instance
				fr.onload = function () {
					// Do stuff on onload, use fr.result for contents of file
					//$( '#xImageHear' ).append( $( '<div/>' ).html( fr.result ) )
					var img = new Image();
					img.src = fr.result;
					img.width = 200;
					img.height = 200;
					
					if (img.complete) { // was cached
						//alert('img-width: '+img.width);
						//alert( oUser.id );
						//$( '#xImageHear' ).html( img );
						//$('#xUser_Image').html( img );
						//$('#param4').val( img );
						//_saveImage( fr.result );
						_test1( fr.result );
						//_copyImage( file.name );
					}
					else { // wait for decoding
						img.onload = function() {
						   //alert('img-width: '+img.width);
						   //$('#xUser_Image').html( img );
						   //_saveImage( fr.result );
						   _test1( fr.result );
						   //_copyImage( file.name );
						}
					}
				};
				//fr.readAsText( file );
				fr.readAsDataURL( file );
				//alert( file.name );
			} else {
				// Handle errors here
				alert( "ต้องเลือกรูปก่อนเป็นอันดับแรก..." )
			}
		}
		
		function _selectImageMember() {

			if ( ! window.FileReader ) {
				return alert( 'FileReader API is not supported by your browser.' );
			}
			var $i = $( '#xFile1' ), // Put file input ID here
				input = $i[0]; // Getting the element from jQuery
			if ( input.files && input.files[0] ) {
				file = input.files[0]; // The file
				//alert( file.getAbsolutePath() );
				fr = new FileReader(); // FileReader instance
				fr.onload = function () {
					// Do stuff on onload, use fr.result for contents of file
					//$( '#xImageHear' ).append( $( '<div/>' ).html( fr.result ) )
					var img = new Image();
					img.src = fr.result;
					img.width = 200;
					img.height = 200;
					
					if (img.complete) { // was cached
						//alert('img-width: '+img.width);
						//alert( oUser.id );
						//$( '#xImageHear' ).html( img );
						//$('#xUser_Image').html( img );
						//$('#param4').val( img );
						//_saveImage( fr.result );
						_test2( fr.result );
						//_copyImage( file.name );
					}
					else { // wait for decoding
						img.onload = function() {
						   //alert('img-width: '+img.width);
						   //$('#xUser_Image').html( img );
						   //_saveImage( fr.result );
						   _test2( fr.result );
						   //_copyImage( file.name );
						}
					}
				};
				//fr.readAsText( file );
				fr.readAsDataURL( file );
				//alert( file.name );
			} else {
				// Handle errors here
				alert( "ต้องเลือกรูปก่อนเป็นอันดับแรก..." )
			}
		}
		function _showAccount() {
			var cStr = "";
			var nCnt = 0;
			var cTemp = "";
			pageLoadingFrame('show','v2');	
			$("#xWorkspace2").hide();
			$("#xWorkspace2").load("form-layouts-separated.html", function(response, status, request) {
				if( status == "success" ) {
					pageLoadingFrame('hide','v2');
					$("#xWorkspace1").hide();
					$("#xWorkspace2").show();
				}
			});	
		}
		
		function _runProfile() {
			var cName = "";
			lProfilePopup = !lProfilePopup;
			if ( lProfilePopup ) {
				$("#xSubmenu").hide();	
				_clearWorkspaceAll();
				if ( !lProfileLoaded ) {
					lProfileLoaded = true;
					pageLoadingFrame('show','v2');
					$("#xWorkspace4").load("profilePage.html", function(response, status, request) {
						if( status == "success" ) {
							//_getEbookData();
							cName = oUser.rows[ 0 ].academy_name;//alert( oUser.fb_code );
							cName = "กศน.อำเภอเรณูนคร";
							$('#xWorkspace4').find('#xAcademyNameProfile').html( cName );//alert(oUser.rows[0].fb_code);
							$('#xWorkspace4').find('#xUserBookImage').html('<img src="https://graph.facebook.com/'+oUser.rows[0].fb_code+'/picture?width=140&height=140"/>');

							//$('#xWorkspace4').find('#xUserImage').html('<table width="100%" border="0" cellspacing="5" cellpadding="5"><tr><td align="center" valign="middle"><img src="assets/images/gallery/person.png"  height="120" width="120"/></td></tr><tr><td align="center" valign="middle"><button class="btn btn-danger btn-block btn-lg" onClick="_backTeacMain();"><span class="glyphicon glyphicon-arrow-left"></span><span class="fa fa-picture-o"></span> โหลดภาพจากมือถือ </button></td></tr></table>');
							
							$('#xWorkspace4').find('#xUserBookName').html(oUser.rows[0].fb_name);
							//oUser.type = "02";
							pageLoadingFrame('hide','v2');
							switch(oUser.type) {
								case "99":_showSuperAdmin();break
								case "01":_showMember();break
								case "02":_showTeacher();break
								case "03":$('#xWorkspace4').find('#xUserBookPosition').html("ผู้ปกครอง นศ."+ cName);break
								case "04":_showAdminAmphur();break
								case "06":$('#xWorkspace4').find('#xUserBookPosition').html("ผู้อำนวยการ "+ cName);break
								case "08":$('#xWorkspace4').find('#xUserBookPosition').html("บรรณรักษณ์ "+ cName);break
								case "09":$('#xWorkspace4').find('#xUserBookPosition').html("เจ้าหน้าที่ "+ cName);break
							}
							//alert("AAA");
							//รหัส mKorsornor
							//$('#xWorkspace4').find('#xAcaCodeProf').val( oUser.rows[0].korsornor_code );
							$('#xWorkspace4').find('#xAcaCodeProf').append($('<option>', {value: oUser.rows[0].academy_code,text: oUser.rows[0].academy_code}));
							//รหัสสถานศึกษา
							$('#xWorkspace4').find('#xAcaKorsProf').val( oUser.rows[0].korsornor_code );
							//ชื่อสถานศึกษา
							$('#xWorkspace4').find('#xAcaNameProf').val( oUser.rows[0].academy_name );
							//รหัสต้นสังกัด
							$('#xWorkspace4').find('#xAcaPareProf').val( oUser.rows[0].parent_code );
							//รหัสลงทะเบียน ผอ.
							//$('#xWorkspace4').find('#xAcaBossCodeProf').val( oUser.rows[0].secret_code.boss );
							//รหัสลงทะเบียนครูผู้สอน
							//$('#xWorkspace4').find('#xAcaTeacCodeProf').val( oUser.rows[0].secret_code.teacher );
							//รหัสลงทะเบียนนักศึกษา
							//$('#xWorkspace4').find('#xAcaMembCodeProf').val( oUser.rows[0].secret_code.member );
							//รหัสลงทะเบียนผู้ปกครอง
							//$('#xWorkspace4').find('#xAcaPareCodeProf').val( oUser.rows[0].secret_code.parents );
							//รหัสห้องถ่ายทอดสดศูนย์
							$('#xWorkspace4').find('#xAcaLiveLinkProf').val( oUser.rows[0].livelink_code );
							//facebook fanpage
							$('#xWorkspace4').find('#xAcaFacebookProf').val( oUser.rows[0].facebook_page );
							//เว็บไซต์
							$('#xWorkspace4').find('#xAcaWWWProf').val( oUser.rows[0].url );
							//ปีการศึกษา
							$('#xWorkspace4').find('#xAcaYearProf').val( oUser.rows[0].year );
							//เทอมที่
							$('#xWorkspace4').find('#xAcaTermProf select').val(  oUser.rows[0].term );
							//รหัสแผนที่
							$('#xWorkspace4').find('#xAcaMapProf').val( oUser.rows[0].map_code ); 
							//ชื่อ สถานศึกษา
							$('#xWorkspace4').find('#xAcaNameProf').val( oUser.rows[0].academy_name );
							//ที่อยู่แผนที่
							$('#xWorkspace4').find('#xAcaAddrProf').val( oUser.rows[0].map_address );
							$("#xWorkspace4").show();
						}
					});
				} else {
					$("#xWorkspace4").show();
				}
			} else {
				$("#xSubmenu").show();
				$("#xWorkspace4").hide();
				$("#"+cOldPage).show();
			}
		}
		
		function _getTypes( c ) {
			var cDiv = "#"+c;
		}
		
		function _getAmphur( n ) {
			oOrganize.amphur = n;
			$('#xWorkspace2').find('#xAcademyTambol').empty();
			for ( var i = 0; i < oOrganize.amphurs[ oOrganize.amphur ].tambols.length; i++ ) {
				$('#xWorkspace2').find('#xAcademyTambol').append($('<option>', {value: oOrganize.amphurs[ oOrganize.amphur ].tambols[i].code,text: "กศน.ตำบล"+oOrganize.amphurs[ oOrganize.amphur ].tambols[i].name}));
			}
		}
		
		function _getTambol( n ) {
			oOrganize.tambol = n;
		}
		
		function _getOrganize( c ) { //Load Parameters
			var cDiv = "#"+c;
			var cVar = $("#xAcademyChangwad").val();
			if (cVar.length==0 ) {
				noty({text: 'โปรดป้อนข้อมูลให้ถูกต้อง', layout: 'topRight', type: 'error'});
				_closeNoty();			
				return;
			}
			var cParam = cWWWHeader + "./assets/data/"+ cVar +".json";
			pageLoadingFrame('show','v2');
			$.get( cParam )
			.success(function(data) {
				pageLoadingFrame('hide','v2');
				oOrganize = JSON.parse( data );	
				$(cDiv).find('#xAcademyAmphur').empty();
				for ( var i = 0; i < oOrganize.amphurs.length; i++ ) {
					$(cDiv).find('#xAcademyAmphur').append($('<option>', {value: oOrganize.amphurs[i].code,text: "กศน.อำเภอ"+oOrganize.amphurs[i].name}));
				}
			}).fail(function() {
				pageLoadingFrame('hide','v2');
				//noty({text: 'ไม่พบรหัส  mKorsornor จังหวัดที่ระบุ', layout: 'topRight', type: 'error'});
				//_closeNoty();	
				$("#xAcademyChangwad").val("");
			});	
		}
		
		function _getTypes() {	
			var cDiv = "#xWorkspace4";
			var cParam = cWWWHeader + "./assets/data/types.json";
			pageLoadingFrame('show','v2');
			$.get( cParam )
			.success(function(data) {
				pageLoadingFrame('hide','v2');
				oType = JSON.parse( data );	
				$(cDiv).find('#xMemberStatus').empty();
				for ( var i = 0; i < oType.types.length; i++ ) {
					$(cDiv).find('#xMemberStatus').append($('<option>', {value: oType.types[i].code,text: oType.types[i].name}));
				}
			}).fail(function() {
				pageLoadingFrame('hide','v2');
				//noty({text: 'ไม่พบรหัส  mKorsornor จังหวัดที่ระบุ', layout: 'topRight', type: 'error'});
				//_closeNoty();	
				//$("#xAcademyChangwad").val("");
			});		
			
			
		}
		
		function _cancelWizard() { //ยกเลิก wizard
			_logout();
		}
			
		function _register() {	
			pageLoadingFrame('show','v2');
			$("#xWorkspace2").hide();
			var oTemp = new Object();
			oTemp = oUser;
			
			oTemp.prename_code 		= $("#xWorkspace2").find('#xPrename').val();	
			oTemp.gender_code  		= $("#xWorkspace2").find('#xGender').val();	
			oTemp.firstname    		= $("#xWorkspace2").find('#xFirstname').val();	
			oTemp.lastname     		= $("#xWorkspace2").find('#xLastname').val();	
			oTemp.nickname     		= $("#xWorkspace2").find('#xNickname').val();	
			oTemp.changwad          = $("#xWorkspace2").find('#xAcademyChangwad').val();
			oTemp.amphur 			= $("#xWorkspace2").find('#xAcademyAmphur').val();	
			oTemp.tambol   			= $("#xWorkspace2").find('#xAcademyTambol').val();	//รหัส กศน.ตำบล
			oTemp.classroom_code 	= $("#xWorkspace2").find('#xClassroom').val();	
			oTemp.idno   			= $("#xWorkspace2").find('#xIdno').val();	
			oTemp.boss_code			= $("#xWorkspace2").find('#xBossCode').val();
			oTemp.teacher_code		= $("#xWorkspace2").find('#xTeacherCode').val();
			oTemp.member_code		= $("#xWorkspace2").find('#xMemberCode').val();	
			oTemp.parents_code		= $("#xWorkspace2").find('#xParentsCode').val();	
			oTemp.idsim = "";
			oTemp.mobile = $("#xWorkspace2").find('#xMobile').val();//
			oTemp.email = $("#xWorkspace2").find('#xEmail').val();
			oTemp.born = "";
			oTemp.status = "A";//เปลี่ยนเป็น Wait เพื่อรอ confirm ได้
			oTemp.type = $("#xWorkspace2").find('#xMemberStatus').val();;//xMemberStatus
				var cParam = JSON.stringify(oTemp);
				//alert( cParam );
				$.post(cWWWHeader+'php/controlDB.php?method=register', { param1: JSON.stringify(oTemp)}, function(response){
					pageLoadingFrame('hide','v2');
					$("#xWorkspace1").show();
					localStorage.setItem("cFBid", oUser.fb_code);
					localStorage.setItem("cFBname", oUser.fb_name);	
					localStorage.setItem("academyCode", oUser.academy_code);
					localStorage.setItem("academyName", oUser.academy_name);
					localStorage.setItem("cType", oUser.type);
					$("#xMenuBack").show();
					$("#xMenuPopup").show();
					$("#xSubmenu").show();
					});	
			}

		function _logout() {
			localStorage.setItem("cFBid", '');
			localStorage.setItem("cFBname", '');
			localStorage.setItem("cPath", "mainPage");
			localStorage.setItem("lFacebook", true);
			localStorage.setItem("academyCode", '');
			localStorage.setItem("academyName", '');
			localStorage.setItem("cType", 'G');
			
			window.location.assign("index.html");
		}

		function _showFriends() {
			var cStr = "";
			var nCnt = 0;
			var cTemp = "";
			//_cai_hide();
			pageLoadingFrame('show','v2');	
			$("#xWorkspace2").hide();
			$("#xWorkspace3").hide();
			$("#xWorkspace2").load("pages-address-book.html", function(response, status, request) {
				if( status == "success" ) {
					pageLoadingFrame('hide','v2');
					nCnt = oUser.friends.total;//
					$("#xMenuBack").show();oUser.path = "friendsPage";
					$('#xWorkspace2').find('#xFriends').html( '<span class="fa fa-users"></span> รายชื่อเพื่อนร่วมเรียน<small>('+nCnt.toString()+' คน)</small>' );
					for ( var i = 0; i<nCnt; i++ ) {
					cStr += '<div class="col-md-3">';
					cStr += '<div class="panel panel-default">';
					cStr += '<div class="panel-body profile">';
					cStr += '<div class="profile-image">';
					cStr += '<img src="https://graph.facebook.com/'+oUser.friends.rows[ i ].fb_code+'/picture?width=120&height=120"/>';
					cStr += '</div>';
					cStr += '<div class="profile-data">';
					cStr += '<div class="profile-data-name">'+oUser.friends.rows[ i ].fb_name+'</div>';
					//cStr += '<div class="profile-data-title">'+oUser.friends.rows[ i ].nname+'</div>';
					cStr += '</div>';
					/*
					cStr += '<div class="profile-controls">';
					cStr += '<a href="#" class="profile-control-left"><span class="fa fa-info"></span></a>';
					cStr += '<a href="#" class="profile-control-right"><span class="fa fa-phone"></span></a>';
					cStr += '</div>';
					*/
					cStr += '</div>';
					cStr += '<div class="panel-body">';
					cStr += '<div class="contact-info">';
					cStr += '<p><small>โทรศัพท์มือถือ</small><br/>'+oUser.friends.rows[ i ].mobile+'</p>';
					cStr += '<p><small>eMail</small><br/>'+oUser.friends.rows[ i ].email+'</p>';
					//cStr += '<p><small>ที่อยู่</small><br/>'+oUser.friends.friend[ i ].address1+' '+oUser.friends.friend[ i ].address2+'</p> ';
					cStr += '<p><small>ที่อยู่</small><br/>(ไม่มีข้อมูล)</p> ';
					cStr += '</div></div></div></div></div>';
					}
					$("#xWorkspace1").hide();
					$('#xWorkspace2').find('#xFriendsDetail').html( cStr );
					$("#xWorkspace2").show();
				}
			});	
		}

		function getRandom( a, n ) {
			  var nLen = a.length;
			  var aTemp = [];
			  var nTemp = -1;
			  var nLen1 = -1;
			  var lFound = false;
			  var nCount = 0;
			  while ( nCount < n ) {
				nTemp = Math.floor(Math.random() * n );
				nLen1 = aTemp.length;
				lFound = false;
				for( var j = 0; j < nLen1; j++ ) {
					if ( aTemp[ j ] == nTemp) {
						lFound = true;
					  break;
					}
				}
				if ( !lFound ) {
				  aTemp.push( nTemp );++nCount;
				}
			  } 
		  return aTemp;
		}

		function _cai_submenu() {
			_cai_hide();
			$('#xWorkspace3').find("#xCaiSubmenu").show();
			$('#xWorkspace3').find('#xCaiSubmenu').html( oCai.aLessonName[ 0 ] );
		}

		function _cai_mainmenu() {
			_cai_hide();
			$('#xWorkspace3').find("#xCaiMainmenu").show();
			$('#xWorkspace3').find('#xCaiSubHeader').html( oCai.aLessonName[ 0 ] );
		}

		function _runExamGraph() {
			$('#xHacker').find('#xExamTitle').hide();
			$('#xHacker').find('#xExamGraph').show();
		}

		function _resetChoice() {
			var cChoice1 = '<div class="alert alert-default" role="alert"><button type="button" class="close"><span class="fa fa-square-o"></span></button>'+oExam.cType.substr(0,1)+"."+oExam.aExams.exams[ oExam.aIndex[ oExam.nPage - 1 ] ].Choices[ 0 ].choice+'</div>';                        
			var cChoice2 = '<div class="alert alert-default" role="alert"><button type="button" class="close"><span class="fa fa-square-o"></span></button>'+oExam.cType.substr(1,1)+"."+oExam.aExams.exams[ oExam.aIndex[ oExam.nPage - 1 ] ].Choices[ 1 ].choice+'</div>';                        
			var cChoice3 = '<div class="alert alert-default" role="alert"><button type="button" class="close"><span class="fa fa-square-o"></span></button>'+oExam.cType.substr(2,1)+"."+oExam.aExams.exams[ oExam.aIndex[ oExam.nPage - 1 ] ].Choices[ 2 ].choice+'</div>';                        
			var cChoice4 = '<div class="alert alert-default" role="alert"><button type="button" class="close"><span class="fa fa-square-o"></span></button>'+oExam.cType.substr(3,1)+"."+oExam.aExams.exams[ oExam.aIndex[ oExam.nPage - 1 ] ].Choices[ 3 ].choice+'</div>';                        
			$('#xWorkspace2').find('#xQuestion').html( oExam.aExams.exams[ oExam.aIndex[ oExam.nPage - 1 ] ].question );
			$('#xWorkspace2').find('#xChoice1').html( cChoice1 );
			$('#xWorkspace2').find('#xChoice2').html( cChoice2 );
			$('#xWorkspace2').find('#xChoice3').html( cChoice3 );
			$('#xWorkspace2').find('#xChoice4').html( cChoice4 );
		}

		function _showPage() {
			_showChoice();
		}

		function _showChoice(  ) { //แสดงค่าที่ถูกต้อง n
			_resetChoice();
			var n = oExam.nPage - 1;//ข้อที่
			var nAnswer = oExam.aAnswer.answer[ n ];//1 หรือ 2 หรือ 3 หรือ 4 ที่เป็นตัวเลือก
			//alert( nAnswer );
			if ( nAnswer != 0 ) {
				var cChoice = '<div class="alert alert-success" role="alert"><button type="button" class="close"><span class="fa fa-check-square"></span></button>'+oExam.cType.substr(nAnswer-1,1)+"."+oExam.aExams.exams[ oExam.aIndex[ oExam.nPage - 1 ] ].Choices[ nAnswer - 1 ].choice+'</div>';                        
				 switch( nAnswer ) {
					 case 1:$('#xWorkspace2').find('#xChoice1').html( cChoice );break;
					 case 2:$('#xWorkspace2').find('#xChoice2').html( cChoice );break;
					 case 3:$('#xWorkspace2').find('#xChoice3').html( cChoice );break;
					 case 4:$('#xWorkspace2').find('#xChoice4').html( cChoice );break;
				 }			 
			}
		}

		function _runExamBack() {
			$('#xWorkspace2').hide();
			$('#xHacker').show();
		}

		function _runCheckScore() {

			var nCnt = 0;
			var cStr = "";
			var cTimer = setInterval(function(){ 
			++nCnt;
			cStr = nCnt.toString()+"%";
		  $('#xWorkspace2').find('.progress-bar').css("width", cStr);	
		  $('#xWorkspace2').find('#xProgressBar').html( cStr + " Complete");	
		  if ( nCnt == 100 )  {
			  $('#xWorkspace2').find('#xTitle01').html( "ตรวจเสร็จแล้ว" );
			  clearInterval(cTimer);
		  }
			}, 10);
		}

		function _cai_hide() {
			$('#xWorkspace3').find('#xCaiMainmenu').hide();
			$('#xWorkspace3').find("#xCaiSubmenu").hide();
			$('#xWorkspace3').find("#xCaiObjective").hide();
			$('#xWorkspace3').find("#xCaiPretest").hide();
			$('#xWorkspace3').find("#xCaiContent").hide();
			$('#xWorkspace3').find("#xCaiPosttest").hide();
		}

		function _cai_submenu() {
			_cai_hide();
			$('#xWorkspace3').find("#xCaiSubmenu").show();
		}

		function _cai_object() {
			_cai_hide();
			$('#xWorkspace3').find("#xCaiObjective").show();
		}

		function _cai_pretest() {
			_cai_hide();
			$('#xWorkspace3').find("#xCaiPretest").show();
		}

		function _cai_run() {
			var cStr = "";
			var nCnt = 0;
			var cTemp = "";
			_cai_hide();
			pageLoadingFrame('show','v2');
			$("#xWorkspace2").hide();
			$("#xWorkspace3").hide();
			$("#xWorkspace3").load("elearning_runPage.html", function(response, status, request) {
				if( status == "success" ) {
					//alert(123);
					//$('#xWorkspace3').find("#xCaiTitle").hide();
					//$('#xMainPage').hide();
					pageLoadingFrame('hide','v2');
					$("#xWorkspace3").show();
					//pretest
					cStr = '<div class="row">';
					cStr += '<div class="col-md-2 col-xs-5">';
					cStr += '<a href="javascript:void(0)" class="friend" onClick="_runExam();">';
					cStr += '<img src="img/icons/pretest.png"/>';
					cStr += '<span><font color="white">แบบทดสอบก่อนเรียน</font></span></a></div>';
					cStr += '<div class="col-md-2 col-xs-2"></div>';
					cStr += '<div class="col-md-2 col-xs-5">';
					if ( oEbook.cai.data[ oEbook.cai.cai_pnt - 1 ].documents.length > 0 ) {
						cStr += '<a href="javascript:void(0)" class="friend" onClick="_runExam();">';
						cStr += '<img src="img/icons/txt.png"/>';
						cStr += '<span><font color="white">เอกสารประกอบ</font></span></a>';      
					}
					cStr += '</div>';
					cStr += '</div>';
					//$('#xWorkspace3').find("#xCaiSubject").html( cStr );
					nCnt = oEbook.cai.data[ oEbook.cai.cai_pnt - 1 ].submenu.length;
					var nCnt1 = 0;
					var nMax = (Math.floor( nCnt/3 ) + 1 ) * 3;		
					for ( var i = 0; i < nMax; i++ ) {
						cTemp += '<div class="row">';
						cTemp += '<div class="col-md-2 col-xs-5">';
						if ( i < nCnt ) {
							cTemp += '<a href="javascript:void(0)" class="friend" onClick="_runExam();">';
							cTemp += '<img src="img/icons/'+ oEbook.cai.data[ oEbook.cai.cai_pnt - 1 ].type[ i ] + '.png"/>';
							cTemp += '<span><font color="white">'+ oEbook.cai.data[ oEbook.cai.cai_pnt - 1 ].submenu[ i ] +'</font></span>';
							cTemp += '</a>';
						}
						cTemp += '</div>';
						
						//++i;
						cTemp += '<div class="col-md-2 col-xs-2"></div>';
						
						++i;
						cTemp += '<div class="col-md-2 col-xs-5">';
						if ( i < nCnt ) {
							cTemp += '<a href="javascript:void(0)" class="friend" onClick="_runExam();">';
							cTemp += '<img src="img/icons/'+ oEbook.cai.data[ oEbook.cai.cai_pnt - 1 ].type[ i ] + '.png"/>';
							cTemp += '<span><font color="white">'+ oEbook.cai.data[ oEbook.cai.cai_pnt - 1 ].submenu[ i ] +'</font></span>';
							cTemp += '</a>';
						}
						cTemp += '</div>';
						
						
						cTemp += '</div>';//div 2 รอบ
						//++i;
					}
					
					cStr += cTemp;
					
					cStr += '<div class="row">';
					cStr += '<div class="col-md-2 col-xs-5">';
					cTemp = oEbook.cai.data[ oEbook.cai.cai_pnt - 1 ].live;
					//cTemp = "var ref = window.open('https://www.youtube.com/v/2EHdbx3QqAA&hl=en_US&feature=player_embedded&version=3', '_blank', 'location=no,toolbar=no,hardwareback=yes');";
					if ( cTemp.length > 0 ) {
						cStr += '<a href="javascript:void(0)" class="friend" onClick="'+ cTemp +'">';
						cStr += '<img src="img/icons/classroom.png"/>';
						cStr += '<span><font color="white">เข้าห้องเรียนออนไลน์</font></span></a>';
					}
					cStr += '</div>';
					cStr += '<div class="col-md-2 col-xs-2"></div>';
					cStr += '<div class="col-md-2 col-xs-5">';
					cStr += '<a href="javascript:void(0)" class="friend" onClick="_runExam();">';
					cStr += '<img src="img/icons/posttest.png"/>';
					cStr += '<span><font color="white">แบบทดสอบหลังเรียน</font></span></a></div></div>';      
					
					$('#xWorkspace3').find("#xCaiSubject").html( cStr );
					//posttest
				}
			});
		}

		function _cai_posttest() {
			_cai_hide();
			$('#xWorkspace3').find("#xCaiPosttest").show();
		}

		//บทเรียนช่วยสอน ที่ลิงค์มาจาก การแสกนหนังสือ
		function _runCAI( ebook_code, ebook_num ) {
			pageLoadingFrame('show','v2');
			$("#xWorkspace2").hide();
			$("#xWorkspace3").load("elearning_mainPage.html", function(response, status, request) {
				if( status == "success" ) {
					//alert(999);
					pageLoadingFrame('hide','v2');
					$("#xWorkspace3").show();
					oCai = new Object();//alert(9);
					oCai.aLessonName = ["การเรียนรู้ด้วยตนเอง","เทคนิคการเรียนรู้ด้วยตนเอง","การทำแผนผังความคิด","ปัจจัยที่ประสบผลสำเร็จ"];
					oCai.lesson = 
					oCai.aObjects = {"msg":["1. เพื่อให้นักศึกษาสามารถเรียนรู้วิธีการปฏิบัติได้ถูกต้อง","2. เพื่อให้นักศึกษามีความรู้ความสามารถในการประกอบอาชีพเสริมต่าง ๆ ได้","3. เพื่อให้นักศึกษามีความคิดสร้างสรร","4. เพื่อให้นักศึกษามีความจำเป็นเลิศ","5. เพื่อให้นักศึกษามีความอดทน"]};
					var nLen = oCai.aObjects.msg.length;
					$('#xWorkspace3').find("#xCaiObjectiveBody").html("<ul class='list-group border-bottom'>");
					for ( var i = 0; i< nLen; i++ ) {				
						//$('#xWorkspace3').find("#xCaiObjectiveBody ul").append('<li class="list-group-item">'+oCai.aObjects.msg[ i ]+'</li>');	
						$('#xWorkspace3').find("#xCaiObjectiveBody ul").append('<li class="list-group-item">'+oEbook.cai.data[ oEbook.cai.cai_pnt - 1 ].objective[ i ]+'</li>');	
					}
					$('#xWorkspace3').find("#xCaiObjectiveBody ul").append('</ul>');
				}
			});	
		}

		//-----------------------------------------------------------------------
		function _runExamReport() {
			//$("#xSubmenu").hide();
			pageLoadingFrame('show','v2');
			$("#xWorkspace2").hide();
			$("#xWorkspace2").load("exam_resultPage.html", function(response, status, request) {
				if( status == "success" ) {
					//alert(999);
					pageLoadingFrame('hide','v2');
					$("#xWorkspace2").show();
					_runCheckScore();
					//$('#xWorkspace4').find('#xUserBookImage').html('<img src="https://graph.facebook.com/'+oUser.id+'/picture?width=120&height=120"/>');
				}
			});
		}

		function _runExamExit() {
			$('#xHacker').hide();
			$("#xSubmenu").show();
			$("#xWorkspace1").show();	
		}

		function _switchChoice( n) { //n = 1,2,3,4  ตัวเลือก
			var nAnswer = oExam.aAnswer.answer[ oExam.nPage - 1 ];//[0,0,0,0,0,0,0,0,0,0,0] ตัวเลือกแต่ละข้อ
			if ( nAnswer != n ) {// if select
				_resetChoice();
				var cChoice = '<div class="alert alert-success" role="alert"><button type="button" class="close"><span class="fa fa-check-square"></span></button>'+oExam.cType.substr(n-1,1)+oExam.aExams.exams[ oExam.aIndex[ oExam.nPage - 1 ] ].Choices[ n - 1 ].choice+'</div>';                        
				 switch( n ) {
					 case 1:$('#xWorkspace2').find('#xChoice1').html( cChoice );break;
					 case 2:$('#xWorkspace2').find('#xChoice2').html( cChoice );break;
					 case 3:$('#xWorkspace2').find('#xChoice3').html( cChoice );break;
					 case 4:$('#xWorkspace2').find('#xChoice4').html( cChoice );break;
				 }			 
				oExam.aAnswer.answer[ oExam.nPage - 1 ] = n;
			} else {
				//_resetChoice();
				
				var cChoice = '<div class="alert alert-default" role="alert"><button type="button" class="close"><span class="fa fa-square-o"></span></button>'+oExam.cType.substr(n-1,1)+oExam.aExams.exams[ oExam.aIndex[ oExam.nPage - 1 ] ].Choices[ n - 1 ].choice+'</div>';                        
				 switch( n ) {
					 case 1:$('#xWorkspace2').find('#xChoice1').html( cChoice );break;
					 case 2:$('#xWorkspace2').find('#xChoice2').html( cChoice );break;
					 case 3:$('#xWorkspace2').find('#xChoice3').html( cChoice );break;
					 case 4:$('#xWorkspace2').find('#xChoice4').html( cChoice );break;
				 }
				
				oExam.aAnswer.answer[ oExam.nPage - 1 ] = 0;
			}
		}

		function _runExamContent() {
			//$("#xMain").hide();
			//alert(88);
			//$("#xSubmenu").hide();
			//$("#xHacker").hide();
			pageLoadingFrame('show','v2');
			$("#xWorkspace2").load("exam_runPage.html", function(response, status, request) {
				if( status == "success" ) {
					//alert("ok");
					//$("#xSubmenu").show();
					pageLoadingFrame('hide','v2');
					$("#xHacker").hide();
					$("#xWorkspace2").show();
					
					oExam = new Object();
					oExam.cCode = "000001",
					oExam.nTimecount = 20;//เวลา
					oExam.nReccount = 10;//จำนวนข้อ
					oExam.cType = "กขคง";
					oExam.nChoice = 4;//ประเภทตัวเลือก
					oExam.aChoice = [1,2,3,4];//สลับตัวเลือก
					oExam.nPage = 1;//ชี้หน้าปัจจุบัน
					oExam.aAnswer = {"answer":[0,0,0,0,0,0,0,0,0,0]};
					oExam.aIndex = [];
					oExam.cUseTime = "";//เวลาที่ใช้ไปในการสอบ
					oExam.aExams = {
						"exams": [{
							"id": 1,
							"question": "กระบวนการแก้ปัญหา ตามหลักการจัดการศึกษานอกโรงเรียนใช้วิธีการใด",
							"Choices": [{
									"choice": "ตั้งสติ",
									"lock": false,
									"answer":false,
									"weigth":0
								}, {
									"choice": "เจริญปัญญา",
									"lock": false,
									"answer":false,
									"weigth":0
								}, {
									"choice": "คิดเป็น",
									"lock": false,
									"answer":true,
									"weigth":1
								}, {
									"choice": "คิดอย่างรอบคอบ",
									"lock": false,
									"answer":false,
									"weigth":0
								}

							]
						}, {
							"id": 2,
							"question": "ศูนย์การศึกษาค้นคว้าด้วยตนเองระดับจังหวัด คืออะไร",
							"Choices": [{
									"choice": "โรงเรียน",
									"lock": false,
									"answer":false,
									"weigth":0
								}, {
									"choice": "ห้องสมุดประชาชน",
									"lock": false,
									"answer":true,
									"weigth":1
								}, {
									"choice": "ที่อ่านหนังสือประจำหมู่บ้าน",
									"lock": false,
									"answer":false,
									"weigth":0
								}, {
									"choice": "ศูนย์การเรียน",
									"lock": false,
									"answer":false,
									"weigth":0
								}

							]
						}, {
							"id": 3,
							"question": "การเรียนการสอนในปัจจุบันควรเน้นในเรื่องใดมากที่สุด",
							"Choices": [{
									"choice": "ครูเข้าสอนให้ตรงเวลา",
									"lock": false,
									"answer":false,
									"weigth":0
								}, {
									"choice": "ครูอธิบายและบอกข้อเท็จจริงให้ทราบ",
									"lock": false,
									"answer":false,
									"weigth":0
								}, {
									"choice": "ให้ผู้เรียนรู้จักเรียนรู้ด้วยตนเอง",
									"lock": false,
									"answer":true,
									"weigth":1
								}, {
									"choice": "เปิดสอนระดับมหาวิทยาลัยในชุมชน",
									"lock": false,
									"answer":false,
									"weigth":0
								}

							]
						}, {
							"id": 4,
							"question": "การคิดจะต้องใช้ข้อมูลประกอบการคิดแก้ปัญหา 3 ด้าน คืออะไรบ้าง",
							"Choices": [{
									"choice": "ช้อมูลเกี่ยวกับตนเอง",
									"lock": false,
									"answer":false,
									"weigth":0
								}, {
									"choice": "ข้อมูลเกี่ยวกับสังคมสิ่งแวดล้อม",
									"lock": false,
									"answer":false,
									"weigth":0
								}, {
									"choice": "ข้อมูลเกี่ยวกับวิชาการ",
									"lock": false,
									"answer":false,
									"weigth":0
								}, {
									"choice": "ถูกทั้ง ก. ข. ค.",
									"lock": true,
									"answer":true,
									"weigth":1
								}
							]
						}, {
							"id": 5,
							"question": "การทำนาโดยวิธีไถกลบตอซังข้าวมีผลดีอย่างไร",
							"Choices": [{
									"choice": "ข้าวในนางอกงามดี",
									"lock": false,
									"answer":false,
									"weigth":0
								}, {
									"choice": "ประหยัดค่าใช้จ่าย",
									"lock": false,
									"answer":false,
									"weigth":0
								}, {
									"choice": "ช่วยแก้ปัญหาดินในนาข้าว",
									"lock": false,
									"answer":false,
									"weigth":0
								}, {
									"choice": "ถูกทั้ง ก. ข. ค.",
									"lock": true,
									"answer":true,
									"weigth":1
								}
							]
						}, {
							"id": 6,
							"question": "เทคนิคการเรียนด้วยตนเองที่สำคัญคือทำอย่างไร",
							"Choices": [{
									"choice": "วิเคราะห์ความต้องการในการเรียนรู้",
									"lock": false,
									"answer":false,
									"weigth":0
								}, {
									"choice": "กำหนดแหล่งวิชาการในการเรียนรู้",
									"lock": false,
									"answer":false,
									"weigth":0
								}, {
									"choice": "รวบรวมข้อมูลสร้างองค์ความรู้",
									"lock": false,
									"answer":false,
									"weigth":0
								}, {
									"choice": "ถูกทั้ง ก. ข. ค.",
									"lock": true,
									"answer":true,
									"weigth":1
								}

							]
						}, {
							"id": 7,
							"question": "ทำอย่างไรจึงจะทำให้การเรียนรู้ด้วยตนเองประสบความสำเร็จ",
							"Choices": [{
									"choice": "ผู้เรียนตระหนักในคุณค่าของตนเอง",
									"lock": false,
									"answer":true,
									"weigth":1
								}, {
									"choice": "เชื่อว่าความรู้เกิดจากเมื่อมีการเรียนการสอนเท่านั้น",
									"lock": false,
									"answer":false,
									"weigth":0
								}, {
									"choice": "การเรียนรู้ตลอดชีวิตเหมาะสมกับเด็ก ๆ",
									"lock": false,
									"answer":false,
									"weigth":0
								}, {
									"choice": "ถูกทั้ง ก. ข. ค.",
									"lock": true,
									"answer":false,
									"weigth":0
								}

							]
						}, {
							"id": 8,
							"question": "การประเมินผลการเรียนรู้ด้วยตนเองให้ประสบความสำเร็จควรปฏิบัติอย่างไร",
							"Choices": [{
									"choice": "ทำแบบฝึกหัดส่งครูผู้สอนอย่างสม่ำเสมอ",
									"lock": false,
									"answer":false,
									"weigth":0
								}, {
									"choice": "ตั้งใจฟังการสอนของครูผู้สอนอย่างสม่ำเสมอ",
									"lock": false,
									"answer":false,
									"weigth":0
								}, {
									"choice": "จัดทำแฟ้มสะสมงานให้สม่ำเสมอเป็นปัจจุบัน",
									"lock": false,
									"answer":true,
									"weigth":1
								}, {
									"choice": "ถูกทั้ง ก. ข. ค.",
									"lock": true,
									"answer":false,
									"weigth":0
								}

							]
						}, {
							"id": 9,
							"question": "ผู้ประสบความสำเร็จในการประกอบธุรกิจขนาดย่อม ควรปฏิบัติตามข้อใด",
							"Choices": [{
									"choice": "วิเคราะห์ความพร้อมของตลาด",
									"lock": false,
									"answer":false,
									"weigth":0
								}, {
									"choice": "ศึกษาความพร้อมส่วนบุคคล การเงิน การตลาด",
									"lock": false,
									"answer":true,
									"weigth":1
								}, {
									"choice": "มีเป้าหมายที่ชัดเจน ต้องมีปริมาณไม่น้อยกว่าคู่แข่ง",
									"lock": false,
									"answer":false,
									"weigth":0
								}, {
									"choice": "รู้วิธการประเมินความต้องการของครอบครัวและชุมชน",
									"lock": false,
									"answer":false,
									"weigth":0
								}

							]
						}, {
							"id": 10,
							"question": "การลงทุนทำน้ำผลไม้เกล็ดหิมะตามวิธีของคุณสมชายไทยฟรุตตี้ ควรมีเงินลงทุนขั้นต้นเท่าไหร่",
							"Choices": [{
									"choice": "5,000-10,000 บาท",
									"lock": false,
									"answer":false,
									"weigth":0
								}, {
									"choice": "10,000-50,000 บาท",
									"lock": false,
									"answer":false,
									"weigth":0
								}, {
									"choice": "100,000-500,000 บาท",
									"lock": false,
									"answer":true,
									"weigth":1
								}, {
									"choice": "500,000 บาทขึ้นไป",
									"lock": false,
									"answer":false,
									"weigth":0
								}

							]
						}
					]
					}
					oExam.aIndex = getRandom( oExam.aExams.exams, oExam.nReccount );
					//_resetChoice();
					_showChoice();
					
					
					//("#xWorkspace3").show();
					//("#xWorkspace4").show();
					//$('#xHacker').find('#xExamGraph').hide();
					//$('#xWorkspace4').find('#xUserBookImage').html('<img src="https://graph.facebook.com/'+oUser.id+'/picture?width=120&height=120"/>');
				}
			});
			
		}

		function _runExam( cLesson, nSubLesson ) {
			//alert(12345);
			$("#xSubmenu").hide();addPage( "xHacker" );menuBack( true );$("#xWorkspace2").hide();
			pageLoadingFrame('show','v2');
			$("#xHacker").load("exam_mainPage.html", function(response, status, request) {
				if( status == "success" ) {
					$("#xWorkspace1").hide();
					pageLoadingFrame('hide','v2');
					$("#xHacker").show();
					$('#xHacker').find('#xExamGraph').hide();
					//$('#xWorkspace4').find('#xUserBookImage').html('<img src="https://graph.facebook.com/'+oUser.id+'/picture?width=120&height=120"/>');
				}
			});
			
		}

		function _resetDiv( c1,  c3 ) {
			//alert( "---->"+c3 );
			$("#"+c1+"_1").remove();
			$("#"+c1).append('<div id="'+c1+"_1"+'"></div>');
			$("#"+c1+"_1").append(c3);
		}

		function getTimeStamp() {
			var now = new Date();
			return ( (now.getDate())+ '/' +(now.getMonth() + 1)
					 + '/' +
					 ( now.getFullYear() + 543 ) + " " +
					 now.getHours() + ':' +
					 ((now.getMinutes() < 10)
						 ? ("0" + now.getMinutes())
						 : (now.getMinutes())) + ':' +
					 ((now.getSeconds() < 10)
						 ? ("0" + now.getSeconds())
						 : (now.getSeconds())));
		}  

		function _showLoading( n ) {
			switch( n ) {
				case 0:pageLoadingFrame('hide','v2');break;
				case 1:pageLoadingFrame('show','v2');break;
			}
		}

		function _clearWorkspaceAll() {
				$("#xWorkspace1").hide();
				$("#xWorkspace2").hide();
				$("#xWorkspace3").hide();
				$("#xWorkspace4").hide();
		}
		
		function _saveProfile1() {
			//alert("Save1");
			oSystem = new Object();
			oSystem.korsornor_code = $('#xWorkspace4').find('#xAcaKorsProf').val();
			oSystem.code = $('#xWorkspace4').find('#xAcaCodeProf').val();
			oSystem.academy_name = $('#xWorkspace4').find('#xAcaNameProf').val();
			oSystem.parent_code = $('#xWorkspace4').find('#xAcaPareProf').val();
			//oSystem.secret_code = new Object();
			oSystem.secret_boss = $('#xWorkspace4').find('#xAcaBossCodeProf').val();
			oSystem.secret_teacher = $('#xWorkspace4').find('#xAcaTeacCodeProf').val();
			oSystem.secret_member = $('#xWorkspace4').find('#xAcaMembCodeProf').val();
			oSystem.secret_parents = $('#xWorkspace4').find('#xAcaPareCodeProf').val();
			oSystem.livelink_code = $('#xWorkspace4').find('#xAcaLiveLinkProf').val();
			oSystem.facebook_page = $('#xWorkspace4').find('#xAcaFacebookProf').val();
			oSystem.url = $('#xWorkspace4').find('#xAcaWWWProf').val();
			oSystem.year = $('#xWorkspace4').find('#xAcaYearProf').val();
			oSystem.term = $('#xWorkspace4').find('#xAcaTermProf').val();
			//แผนที่
			oSystem.map_code = $('#xWorkspace4').find('#xQRCodeProf').val();
			//oSystem.map_code = "123456789";
			oSystem.map_address = $('#xWorkspace4').find('#xAcaAddrProf').val();
			
			//var cTemp = JSON.stringify(oSystem);
			var cTemp = "param1="+oSystem.korsornor_code;
				cTemp += "& param2="+oSystem.code;
				cTemp += "& param3="+oSystem.academy_name;
				cTemp += "& param4="+oSystem.parent_code;
				cTemp += "& param5="+oSystem.secret_boss;
				cTemp += "& param6="+oSystem.secret_teacher;
				cTemp += "& param7="+oSystem.secret_member;
				cTemp += "& param8="+oSystem.secret_parents;
				cTemp += "& param9="+oSystem.livelink_code;
				cTemp += "& param10="+oSystem.facebook_page;
				cTemp += "& param11="+oSystem.url;
				cTemp += "& param12="+oSystem.year;
				cTemp += "& param13="+oSystem.term;
				
				var n1 = oUser.rows[0].map_code.indexOf("width=")-13;
				var c1 = oUser.rows[0].map_code.substr( 13,n1);		
				
				cTemp += "& param14="+c1;
				cTemp += "& param15="+oSystem.map_address;
			//alert( cTemp );
			pageLoadingFrame('show','v2');
			/*
			$.post('http://www.mkorsornor.com/php/controlDB.php?method=saveProfile', { param1: JSON.stringify(oSystem)}, function(response){
				pageLoadingFrame('hide','v2');	
				//ชื่อสถานศึกษา
				oUser.rows[0].academy_name = $('#xWorkspace4').find('#xAcaNameProf').val();
				//รหัสต้นสังกัด
				oUser.rows[0].parent_code = $('#xWorkspace4').find('#xAcaPareProf').val();
				//รหัสลงทะเบียน ผอ.
				oUser.rows[0].secret_boss = $('#xWorkspace4').find('#xAcaBossCodeProf').val();
				//รหัสลงทะเบียนครูผู้สอน
				oUser.rows[0].secret_teacher = $('#xWorkspace4').find('#xAcaTeacCodeProf').val();
				//รหัสลงทะเบียนนักศึกษา
				oUser.rows[0].secret_member = $('#xWorkspace4').find('#xAcaMembCodeProf').val();
				//รหัสลงทะเบียนผู้ปกครอง
				oUser.rows[0].secret_parents = $('#xWorkspace4').find('#xAcaPareCodeProf').val();
				//รหัสห้องถ่ายทอดสดศูนย์
				oUser.rows[0].livelink_code = $('#xWorkspace4').find('#xAcaLiveLinkProf').val();
				//facebook fanpage
				oUser.rows[0].facebook_page = $('#xWorkspace4').find('#xAcaFacebookProf').val();
				//เว็บไซต์
				oUser.rows[0].url = $('#xWorkspace4').find('#xAcaWWWProf').val();
				//ปีการศึกษา
				oUser.rows[0].year = $('#xWorkspace4').find('#xAcaYearProf').val();
				//เทอมที่
				oUser.rows[0].term = $('#xWorkspace4').find('#xAcaTermProf').val();
				//map code
				oUser.rows[0].map_code = $('#xWorkspace4').find('#xQRCodeProf').val();
				//map address
				oUser.rows[0].map_address = $('#xWorkspace4').find('#xAcaAddrProf').val();
				
				var cName = oUser.rows[ 0 ].academy_name;
				$('#xWorkspace4').find('#xAcademyNameProfile').html( cName );
				switch(oUser.rows[0].type) {
					case "B":$('#xWorkspace4').find('#xUserBookPosition').html("ผู้อำนวยการ "+ cName );break
					case "M":$('#xWorkspace4').find('#xUserBookPosition').html("นักศึกษา "+ cName);break
					case "A":$('#xWorkspace4').find('#xUserBookPosition').html("admin "+ cName);break
					case "T":$('#xWorkspace4').find('#xUserBookPosition').html("ครูผู้สอน "+ cName);break
				}
				
			});	
			*/
				var cParam = cWWWHeader+"php/controlDB.php?method=saveProfile& "+ cTemp;
				//alert( cParam );
				$.get( cParam )
				.success(function(data) {
					pageLoadingFrame('hide','v2');	
					//ชื่อสถานศึกษา
					oUser.rows[0].academy_name = $('#xWorkspace4').find('#xAcaNameProf').val();
					//รหัสต้นสังกัด
					oUser.rows[0].parent_code = $('#xWorkspace4').find('#xAcaPareProf').val();
					//รหัสลงทะเบียน ผอ.
					oUser.rows[0].secret_boss = $('#xWorkspace4').find('#xAcaBossCodeProf').val();
					//รหัสลงทะเบียนครูผู้สอน
					oUser.rows[0].secret_teacher = $('#xWorkspace4').find('#xAcaTeacCodeProf').val();
					//รหัสลงทะเบียนนักศึกษา
					oUser.rows[0].secret_member = $('#xWorkspace4').find('#xAcaMembCodeProf').val();
					//รหัสลงทะเบียนผู้ปกครอง
					oUser.rows[0].secret_parents = $('#xWorkspace4').find('#xAcaPareCodeProf').val();
					//รหัสห้องถ่ายทอดสดศูนย์
					oUser.rows[0].livelink_code = $('#xWorkspace4').find('#xAcaLiveLinkProf').val();
					//facebook fanpage
					oUser.rows[0].facebook_page = $('#xWorkspace4').find('#xAcaFacebookProf').val();
					//เว็บไซต์
					oUser.rows[0].url = $('#xWorkspace4').find('#xAcaWWWProf').val();
					//ปีการศึกษา
					oUser.rows[0].year = $('#xWorkspace4').find('#xAcaYearProf').val();
					//เทอมที่
					oUser.rows[0].term = $('#xWorkspace4').find('#xAcaTermProf').val();
					//map code
					//oUser.rows[0].map_code = $('#xWorkspace4').find('#xQRCodeProf').val();
					//map address
					oUser.rows[0].map_address = $('#xWorkspace4').find('#xAcaAddrProf').val();
					
					oUser.rows[ 0 ].academy_name = "กศน.อำเภอเรณูนคร";
					var cName = oUser.rows[ 0 ].academy_name;
					cName = "กศน.อำเภอเรณูนคร";
					$('#xWorkspace4').find('#xAcademyNameProfile').html( cName );
					//switch(oUser.rows[0].type) {
						//case "B":$('#xWorkspace4').find('#xUserBookPosition').html("ผู้อำนวยการ "+ cName );break
						//case "M":$('#xWorkspace4').find('#xUserBookPosition').html("นักศึกษา! "+ cName);break
						//case "A":$('#xWorkspace4').find('#xUserBookPosition').html("admin "+ cName);break
						//case "T":$('#xWorkspace4').find('#xUserBookPosition').html("ครูผู้สอน "+ cName);break
					//}
				}).fail(function() {
				  });			  
		}

		function _runFBLink() {
			var cName = $('#xWorkspace4').find('#xAcaFacebookProf').val();//oUser.rows[0].facebook_page
			var ref = window.open( cName, '_blank', 'location=no,toolbar=no,hardwareback=yes');		
		}
		
		function _runWWWLink() {
			var cName = $('#xWorkspace4').find('#xAcaWWWProf').val();
			var ref = window.open( cName, '_blank', 'location=no,toolbar=no,hardwareback=yes');		
		}
		
		function _saveMap() {
		}
		
		function _run( n ) {
			switch( n ) {
				case 1://ebook
					pageLoadingFrame('show','v2');
					$("#xWorkspace2").load("ebook_mainPage.html", function(response, status, request) {
						if( status == "success" ) {
							_getEbookData();
							pageLoadingFrame('hide','v2');
							menuBack( true );addPage("xWorkspace2");
							$("#xWorkspace1").hide();
							$("#xWorkspace2").hide();
							$("#xWorkspace3").hide();
							$("#xWorkspace2").show();
							$('#xWorkspace2').find('#xElibraryName').html("eLibrary " + oUser.rows[0].academy_name);
							$('#xWorkspace2').find('#xEbookSelected').html("2");
							$('#xWorkspace2').find('#xEbookReaded').html("5");
							$('#xWorkspace2').find('#xEbookStore').html("23");
							$('#xWorkspace2').find('#xEbookComing').html("3");
							$('#xWorkspace2').find('#xEbookHot').html("5");
							
							$('#xWorkspace2').find('#xEbookFriends').html("14 คน");
							$('#xWorkspace2').find('#xEbookArrivalSum').html("10 รายการ");
							$('#xWorkspace2').find('#xEbookHotSum').html("10 รายการ");
						}
					});
					break;
				case 2://exam
					break;
				case 3://cai
					break;
				case 4://class	
					pageLoadingFrame('show','v2');
					oUser.path = "live_mainPage";
					$("#xWorkspace2").load( oUser.path +".html", function(response, status, request) {
						if( status == "success" ) {
							_getEbookData();
							pageLoadingFrame('hide','v2');
							menuBack( true );addPage("xWorkspace2");
							$("#xWorkspace1").hide();
							$("#xWorkspace2").hide();
							$("#xWorkspace2").show();
							$("#xSubmenu").hide();
							//$("#xLiveLink").html('<iframe width="560" height="315" src="https://www.youtube.com/embed/2EHdbx3QqAA" frameborder="0" allowfullscreen></iframe>');
							//$('#xLiveLink").html('https://www.facebook.com/?stype=lo&jlou=AfdN4PT4mPzJvnCfQvMnx28wB9JxH3kWEZheKn5QaZtlhKrIF75KcS9z3sob1TC1UUoONP9yxzn9sBPen6mst3Ic7-D5mRWEtsAtNTHAsOxqxA&smuh=40990&lh=Ac-ixjAVySsWm-o6');
							var ref = window.open('https://www.facebook.com/ksnrenunakhon305/?fref=ts');
						}
					});
					break;
			}
		}

		function _runEbookScanMainPage() {
			pageLoadingFrame('show','v2');
			$("#xWorkspace2").load("afterscanPage.html", function(response, status, request) {
				if( status == "success" ) {
					pageLoadingFrame('hide','v2');oUser.path="afterscanPage";addPage("xWorkspace2");menuBack(true);
					$("#xSubmenu").show();
					$("#xWorkspace2").show();
					//alert(99);
					$("#xWorkspace2").find('#xEbookName').html(oEbook.name);
					$("#xWorkspace2").find('#xEbookAuthor').html(oEbook.author);
					$("#xWorkspace2").find('#xEbookPage').html(oEbook.page + " หน้า");
					$("#xWorkspace2").find('#xEbookYear').html(oEbook.year);
					$("#xWorkspace2").find('#xEbookEdition').html(oEbook.edition);
					$("#xWorkspace2").find('#xEbookIsbn').html(oEbook.isbn);
					$("#xWorkspace2").find('#xEbookPrice').html(oEbook.price + " บาท");
					$("#xWorkspace2").find('#xFirstPage').html('<img src="http://www.mkorsornor.com/assets/images/ebook/'+oEbook.isbn+'.jpg"  width="180" align="middle">');
					//alert( '<img src="http://www.mkorsornor.com/assets/images/ebook/'+oEbook.isbn+'.jpg"  width="180" align="middle">' );
		//แสดงรายการ eBook
					var nLen = oEbook.exam.data.length;
					var cStr = "";
					var cTemp = "";
					var nTemp = 0;
					var nScore = 0;
					for ( var i = 0;i<nLen; i++ ) {
						cStr = '<a href="javascript:void(0)" class="list-group-item" onClick="var ref = window.open(\''+oEbook.ebook.data[ i ].link+'\', \'_blank\', \'location=no,toolbar=no,hardwareback=yes\');">';
						if ( oEbook.ebook.data[ i ].status )
							cStr += '<div class="list-group-status status-online"></div>';
						else
							cStr += '<div class="list-group-status status-offline"></div>';					
						cStr += '<span class="contacts-title">'+oEbook.ebook.data[ i ].header+'</span>';
						cStr += '<p>'+oEbook.ebook.data[ i ].description+'</p> ';
						cStr += '<div class="list-group-controls">';
						if ( oEbook.ebook.data[ i ].status )
							cStr += '<button class="btn btn-success"><span class="fa fa-check-square-o"></span></button>';
						else	
							cStr += '<button class="btn btn-default"><span class="fa fa-square-o"></span></button>';
						cStr += '</div></a>';
						
						$("#xWorkspace2").find('#xEbookLessonList').append( cStr );
					}
		//แสดงรายการ exam
					nLen = oEbook.ebook.data.length;
					cStr = "";
					for ( var i = 0;i<nLen; i++ ) {
						cStr = '<a href="javascript:void(0)" class="list-group-item" onClick="_runExam(\''+oEbook.exam.exam_id+'\','+oEbook.exam.data[ i ].lesson+');">';
						
						if ( oEbook.exam.data[ i ].status ) {
							cStr += '<div class="list-group-status status-online"></div>';
							nTemp = ( oEbook.exam.data[ i ].correct / oEbook.exam.data[ i ].score ) * 100;
							if ( nTemp < 49 ) cTemp = "btn btn-danger";
							else if ( nTemp >79 ) cTemp = "btn btn-warning";
							else cTemp = "btn btn-success";
						}
						else {
							cTemp = "btn btn-default";
							cStr += '<div class="list-group-status status-offline"></div>';					
						}
						cStr += '<span class="contacts-title">'+oEbook.exam.data[ i ].header+'</span>';
						cStr += '<p>'+oEbook.exam.data[ i ].description+'</p> ';
						cStr += '<div class="list-group-controls">';
						if ( oEbook.exam.data[ i ].status )
							cStr += '<button class="'+ cTemp +'"><span class="fa fa-check-square-o"></span></button>';
						else	
							cStr += '<button class="'+ cTemp +'"><span class="fa fa-square-o"></span></button>';
						cStr += '</div></a>';
						
						$("#xWorkspace2").find('#xEbookExamList').append( cStr );
						//alert( cStr );
					}	
		//แสดงรายการ cai
					nLen = oEbook.cai.data.length;
					cStr = ""
					for ( var i = 0;i<nLen; i++ ) {
						cStr = '<a href="javascript:void(0)" class="list-group-item" onClick="_runCAI(\''+oEbook.cai.exam_id+'\','+oEbook.cai.data[ i ].lesson+');">';
						if ( oEbook.cai.data[ i ].status ) {
							cStr += '<div class="list-group-status status-online"></div>';
							nTemp = oEbook.cai.data[ i ].process;
							if ( nTemp < 49 ) cTemp = "progress-bar-danger";
							else if ( nTemp >79 ) cTemp = "progress-bar-warning";
							else cTemp = "progress-bar-success";
						}
						else {
							cTemp = "btn btn-default";
							cStr += '<div class="list-group-status status-offline"></div>';					
						}
						cStr += '<span class="contacts-title">'+oEbook.cai.data[ i ].header+'</span>';
						cStr += '<p>'+oEbook.cai.data[ i ].description+'</p> ';
						cStr += '<div class="list-group-controls">';
						if ( oEbook.cai.data[ i ].status ) {
							//alert( cTemp );
							cStr += '<div class="progress"><div class="progress-bar '+cTemp+' progress-bar-striped active"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: '+oEbook.cai.data[ i ].process.toString() + '%'+'">'+oEbook.cai.data[ i ].process.toString()+'% complete</div></div> ';//alert( oEbook.cai.data[ i ].process.toString() + "%" );
							//alert('<div class="progress"><div class="progress-bar '+cTemp+' progress-bar-striped active"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: '+oEbook.cai.data[ i ].process.toString() + '%">'+ oEbook.cai.data[ i ].process.toString() +'</div></div>');
						}
						else	
							cStr += '<div class="progress"><div class="progress-bar progress-bar-default progress-bar-striped active"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 1%">1% complete</div></div> ';
						cStr += '</div></a>';
						
						$("#xWorkspace2").find('#xEbookCaiList').append( cStr );
					}	
		//แสดงรายการ link - facebook
					nLen = oEbook.link.facebook.length;
					cStr = ""
					if ( nLen > 0 ) {
						for ( var i = 0;i<nLen; i++ ) {
							cStr = '<a href="javascript:void(0)" class="list-group-item" onClick="'+oEbook.link.facebook[ i ].link+'");">';
							cStr += '<div class="list-group-status"></div>';
							cStr += '<span class="contacts-title">'+oEbook.link.facebook[ i ].header+'</span>';
							cStr += '<p>'+oEbook.link.facebook[ i ].description+'</p> ';
							cStr += '<div class="list-group-controls"><span class="fa fa-angle-right"></span></div>';
							cStr += '</a></div>';
							
							$("#xWorkspace2").find('#xEbookFacebookList').append( cStr );
						}
					}			
		//แสดงรายการ link - video
					nLen = oEbook.link.video.length;
					cStr = "";
					if ( nLen > 0 ) {
						for ( var i = 0;i<nLen; i++ ) {
							cStr = '<a href="javascript:void(0)" class="list-group-item" onClick="'+oEbook.link.video[ i ].link+'");">';
							cStr += '<div class="list-group-status"></div>';
							cStr += '<span class="contacts-title">'+oEbook.link.video[ i ].header+'</span>';
							cStr += '<p>'+oEbook.link.video[ i ].description+'</p> ';
							cStr += '<div class="list-group-controls"><span class="fa fa-angle-right"></span></div>';
							cStr += '</a></div>';
							
							$("#xWorkspace2").find('#xEbookVDOList').append( cStr );
						}
					}			
		//แสดงรายการ link - link
					nLen = oEbook.link.link.length;
					cStr = "";
					if ( nLen > 0 ) {
						for ( var i = 0;i<nLen; i++ ) {
							cStr = '<a href="javascript:void(0)" class="list-group-item" onClick="'+oEbook.link.link[ i ].link+'");">';
							cStr += '<div class="list-group-status"></div>';
							cStr += '<span class="contacts-title">'+oEbook.link.link[ i ].header+'</span>';
							cStr += '<p>'+oEbook.link.link[ i ].description+'</p> ';
							cStr += '<div class="list-group-controls"><span class="fa fa-angle-right"></span></div>';
							cStr += '</a></div>';
							
							$("#xWorkspace2").find('#xEbookLinkList').append( cStr );
						}
					}			
		//แสดงรายการ link - map
					nLen = oEbook.link.map.length;
					cStr = "";
					if ( nLen > 0 ) {
						for ( var i = 0;i<nLen; i++ ) {
							cStr = '<a href="javascript:void(0)" class="list-group-item" onClick="'+oEbook.link.map[ i ].link+'");">';
							cStr += '<div class="list-group-status"></div>';
							cStr += '<span class="contacts-title">'+oEbook.link.map[ i ].header+'</span>';
							cStr += '<p>'+oEbook.link.map[ i ].description+'</p> ';
							cStr += '<div class="list-group-controls"><span class="fa fa-angle-right"></span></div>';
							cStr += '</a></div>';
							
							$("#xWorkspace2").find('#xEbookMapList').append( cStr );
						}
					}				
					
				}
			});	
		}

		function _barcodeBook() {
			var cResult;
			window.plugins.barcodeScanner.scan( function(result) {	
			oEbook = new Object();
			oEbook.isbn = result.text;
			oEbook.name = "ทช11003 ศิลปศึกษาประถม";
			oEbook.author = "ศศิเกษม จันปฐมพงศ์";
			oEbook.page = "142";
			oEbook.year = "2554";
			oEbook.edition = "1";
			oEbook.price = " ";
			oEbook.ebook = {"data":[{"header":"เนื้อหาก่อนบทที่ 1","description":"บทนำ สารบัญ คำชี้แจง ...","link":"http://www.pattanadownload.com/download/g.6/%E0%B8%AB%E0%B8%99%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B2%E0%B8%9A%E0%B8%B1%E0%B8%87%E0%B8%84%E0%B8%B1%E0%B8%9A%2042%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B2%20PDF/%E0%B8%A8%E0%B8%B4%E0%B8%A5%E0%B8%9B%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%B2%20%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%96%E0%B8%A1.pdf","status":true},{"header":"บทที่ 1 การเรียนรู้ด้วยตนเอง","description":"ทักษะพื้นฐานด้านต่าง ๆ ...","link":"https://docs.google.com/viewer?url="+cWWWHeader+"ebooks/san.pdf","status":true},{"header":"บทที่ 2 การใช้แหล่งเรียนรู้","description":"ห้องสมุดประชาชน ...","link":"https://docs.google.com/viewer?url="+cWWWHeader+"ebooks/000001_03.pdf","status":false},{"header":"บทที่ 3 การจัดการเรียนรู้","description":"ทักษะการจัดการความรู้ ...","link":"https://docs.google.com/viewer?url="+cWWWHeader+"ebooks/000001_04.pdf","status":false},{"header":"บทที่ 4 การคิดเป็น","description":"การวิเคราะห์ การแก้ปัญหา ...","link":"https://docs.google.com/viewer?url="+cWWWHeader+"ebooks/000001_05.pdf","status":false},{"header":"บทที่ 5 การวิจัยอย่างง่าย","description":"สถิติ ความสำคัญ ...","link":"https://docs.google.com/viewer?url="+cWWWHeader+"ebooks/000001_06.pdf","status":false},{"header":"บทที่ 6 ทักษะการเรียนรู้","description":"การพัฒนาอาชีพในพื้นที่ ...","link":"https://docs.google.com/viewer?url="+cWWWHeader+"ebooks/000001_07.pdf","status":true}]}
			oEbook.exam = {"exam_id":"000001",
				"data":[
						{"header":"ข้อสอบบทที่ 1","description":"จำนวน 10 ข้อ, 4 ตัวเลือก","score":10,"correct":8,"lesson":1,"status":true},
						{"header":"ข้อสอบบทที่ 2","description":"จำนวน 10 ข้อ, 4 ตัวเลือก","score":10,"correct":7,"lesson":2,"status":true},
						{"header":"ข้อสอบบทที่ 3","description":"จำนวน 10 ข้อ, 4 ตัวเลือก","score":10,"correct":4,"lesson":3,"status":true},
						{"header":"ข้อสอบบทที่ 4","description":"จำนวน 10 ข้อ, 4 ตัวเลือก","score":10,"correct":0,"lesson":4,"status":false},
						{"header":"ข้อสอบบทที่ 5","description":"จำนวน 10 ข้อ, 4 ตัวเลือก","score":10,"correct":0,"lesson":5,"status":false},
						{"header":"ข้อสอบบทที่ 6","description":"จำนวน 10 ข้อ, 4 ตัวเลือก","score":10,"correct":0,"lesson":6,"status":false},
						{"header":"ข้อสอบระคน","description":"จำนวน 20 ข้อ, 4 ตัวเลือก","score":10,"correct":0,"lesson":5,"status":false}
						]};
			oEbook.cai = {"exam_id":"000001","cai_pnt":1,
				"data":[
						{"header":"บทที่ 1 การเรียนรู้ด้วยตนเอง","description":"4 หน่วย, แบบทดสอบ 40 ข้อ","lesson":1,"process":80,"status":true,"objective":["1.จุดประสงค์การเรียนรู้ 1","2.จุดประสงค์การเรียนรู้ 2","3.จุดประสงค์การเรียนรู้ 3","4.จุดประสงค์การเรียนรู้ 4","5.จุดประสงค์การเรียนรู้ 5"],"submenu":["1.1 ความหมาย ความสำคัญและกระบวนการเรียนรู้ด้วยตนเอง","1.2 ทักษะพื้นฐานทางด้านการศึกษาหาความรู้","1.3 ทักษะการพูดและการทำแผนผังความคิด","1.4 ปัจจัยที่ทำให้การเรียนรู้ด้วยตนเองประสบความสำเร็จ"],"type":["ppt","pdf","doc","xls"],"documents":[],"live":"var ref = window.open('https://www.youtube.com/watch?v=G1arbHJVuEw', '_blank', 'location=no,toolbar=no,hardwareback=yes');"},
						{"header":"บทที่ 2 การใช้แหล่งเรียนรู้","description":"3 หน่วย, แบบทดสอบ 30 ข้อ","lesson":2,"process":72,"status":true,"submenu":[]},
						{"header":"บทที่ 3 การจัดการความรู้","description":"3 หน่วย, แบบทดสอบ 30 ข้อ","lesson":3,"process":55,"status":true,"submenu":[]},
						{"header":"บทที่ 4 การคิดเป็น","description":"5 หน่วย, แบบทดสอบ 50 ข้อ","lesson":4,"process":30,"status":true,"submenu":[]},
						{"header":"บทที่ 5 การวิจัยอย่างง่าย","description":"5 หน่วย, แบบทดสอบ 50 ข้อ","lesson":5,"process":0,"status":false,"submenu":[]},
						{"header":"บทที่ 6 ทักษะการเรียนรู้...","description":"4 หน่วย, แบบทดสอบ 40 ข้อ","lesson":6,"process":0,"status":false,"submenu":[]}
						]};	
			oEbook.link = {
				"facebook":[
							{"header":"เพจหอสมุดแห่งชาติ","description":"บทที่ 1 หน้า 45 หอสมุดแห่งชาติ","link":"var ref = window.open('https://www.facebook.com/pages/หอสมุดแห่งชาติ-Library-national/413758945348366?fref=ts', '_blank', 'location=no,toolbar=no,hardwareback=yes');","status":true}
						],				
				"video":[
							{"header":"....","description":"youtube ครูนาย","link":"var ref = window.open('https://www.youtube.com/watch?v=YywYgcQOIYo', '_blank', 'location=no,toolbar=no,hardwareback=yes');","status":true}
						],				
				"link":[
							{"header":"เว็บมหาวิทยาลัยรามคำแหง","description":"บทที่ 1 หน้า 17 มหาวิทยาลัยเปิดของรัฐ","link":"var ref = window.open('http://www.ru.ac.th/th/', '_blank', 'location=no,toolbar=no,hardwareback=yes');","status":true},
							{"header":"เว็บมหาวิทยาลัยสุโขทัยธรรมาธิราช","description":"บทที่ 1 หน้า 17 มหาวิทยาลัยเปิดของรัฐ","link":"var ref = window.open('http://www.stou.ac.th/ourking.html', '_blank', 'location=no,toolbar=no,hardwareback=yes');","status":true}
						],				
				"map":[
							{"header":"มหาวิทยาลัยรามคำแหง","description":"บทที่ 1 หน้า 17 มหาวิทยาลัยเปิดของรัฐ","link":"var ref = window.open('https://www.google.co.th/maps/place/มหาวิทยาลัยรามคำแหง/@13.7562561,100.6167329,17z/data=!3m1!4b1!4m5!3m4!1s0x30e29e1e6d77de73:0xafc4658f6317648e!8m2!3d13.7562561!4d100.6189216', '_blank', 'location=no,toolbar=no,hardwareback=yes');","status":true},
							{"header":"มหาวิทยาลัยสุโขทัยธรรมาธิราช","description":"บทที่ 1 หน้า 17 มหาวิทยาลัยเปิดของรัฐ","link":"var ref = window.open('https://www.google.co.th/maps/place/มหาวิทยาลัยสุโขทัยธรรมาธิราช/@13.911126,100.5353663,17z/data=!3m1!4b1!4m5!3m4!1s0x30e2837b9591b0e1:0xf01923824353130!8m2!3d13.911126!4d100.537555', '_blank', 'location=no,toolbar=no,hardwareback=yes');","status":true},
							{"header":"หอสมุดแห่งชาติ","description":"บทที่ 1 หน้า 45 ","link":"var ref = window.open('https://www.google.co.th/maps/place/หอสมุดแห่งชาติ/@13.7723056,100.5051153,15z/data=!4m2!3m1!1s0x0:0xa53d16a898cfeb4c?sa=X&sqi=2&ved=0ahUKEwiU9L36jOPPAhWGto8KHRuzCE8Q_BIIejAR', '_blank', 'location=no,toolbar=no,hardwareback=yes');","status":true}
						]};				
			_clearWorkspaceAll();
			_runEbookScanMainPage();
			}, function(error) {
				alert("Scanning failed: " + error);
			}
			)
		}
				
		function _barcode1() {
			
			oEbook = new Object();
			oEbook.isbn = "000018";
			oEbook.name = "ทช11003ศิลปศึกษา";
			oEbook.author = "ศศิเกษม จันปฐมพงศ์";
			oEbook.page = "315";
			oEbook.year = "2556";
			oEbook.edition = "1";
			oEbook.price = "180";
			oEbook.ebook = {"data":[{"header":"เนื้อหาทั้งเล่ม","description":"eBook ครูดำ ...","link":"http://www.pattanadownload.com/download/g.6/%E0%B8%AB%E0%B8%99%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B2%E0%B8%9A%E0%B8%B1%E0%B8%87%E0%B8%84%E0%B8%B1%E0%B8%9A%2042%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B2%20PDF/%E0%B8%A8%E0%B8%B4%E0%B8%A5%E0%B8%9B%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%B2%20%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%96%E0%B8%A1.pdf","status":true}]}
			oEbook.exam = {"exam_id":"000001",
				"data":[
						{"header":"ข้อสอบบทที่ 1","description":"จำนวน 10 ข้อ, 4 ตัวเลือก","score":10,"correct":8,"lesson":1,"status":true},
						{"header":"ข้อสอบบทที่ 2","description":"จำนวน 10 ข้อ, 4 ตัวเลือก","score":10,"correct":7,"lesson":2,"status":true},
						{"header":"ข้อสอบบทที่ 3","description":"จำนวน 10 ข้อ, 4 ตัวเลือก","score":10,"correct":4,"lesson":3,"status":true},
						{"header":"ข้อสอบบทที่ 4","description":"จำนวน 10 ข้อ, 4 ตัวเลือก","score":10,"correct":0,"lesson":4,"status":false},
						{"header":"ข้อสอบบทที่ 5","description":"จำนวน 10 ข้อ, 4 ตัวเลือก","score":10,"correct":0,"lesson":5,"status":false},
						{"header":"ข้อสอบบทที่ 6","description":"จำนวน 10 ข้อ, 4 ตัวเลือก","score":10,"correct":0,"lesson":6,"status":false},
						{"header":"ข้อสอบระคน","description":"จำนวน 20 ข้อ, 4 ตัวเลือก","score":10,"correct":0,"lesson":5,"status":false}
						]};
			oEbook.cai = {"exam_id":"000001","cai_pnt":1,
				"data":[
						{"header":"บทที่ 1 การเรียนรู้ด้วยตนเอง","description":"4 หน่วย, แบบทดสอบ 40 ข้อ","lesson":1,"process":80,"status":true,"objective":["1.จุดประสงค์การเรียนรู้ 1","2.จุดประสงค์การเรียนรู้ 2","3.จุดประสงค์การเรียนรู้ 3","4.จุดประสงค์การเรียนรู้ 4","5.จุดประสงค์การเรียนรู้ 5"],"submenu":["1.1 ความหมาย ความสำคัญและกระบวนการเรียนรู้ด้วยตนเอง","1.2 ทักษะพื้นฐานทางด้านการศึกษาหาความรู้","1.3 ทักษะการพูดและการทำแผนผังความคิด","1.4 ปัจจัยที่ทำให้การเรียนรู้ด้วยตนเองประสบความสำเร็จ"],"type":["ppt","pdf","doc","xls"],"documents":[],"live":"var ref = window.open('https://www.youtube.com/watch?v=G1arbHJVuEw', '_blank', 'location=no,toolbar=no,hardwareback=yes');"},
						{"header":"บทที่ 2 การใช้แหล่งเรียนรู้","description":"3 หน่วย, แบบทดสอบ 30 ข้อ","lesson":2,"process":72,"status":true,"submenu":[]},
						{"header":"บทที่ 3 การจัดการความรู้","description":"3 หน่วย, แบบทดสอบ 30 ข้อ","lesson":3,"process":55,"status":true,"submenu":[]},
						{"header":"บทที่ 4 การคิดเป็น","description":"5 หน่วย, แบบทดสอบ 50 ข้อ","lesson":4,"process":30,"status":true,"submenu":[]},
						{"header":"บทที่ 5 การวิจัยอย่างง่าย","description":"5 หน่วย, แบบทดสอบ 50 ข้อ","lesson":5,"process":0,"status":false,"submenu":[]},
						{"header":"บทที่ 6 ทักษะการเรียนรู้...","description":"4 หน่วย, แบบทดสอบ 40 ข้อ","lesson":6,"process":0,"status":false,"submenu":[]}
						]};	
			oEbook.link = {
				"facebook":[
							{"header":"เพจหอสมุดแห่งชาติ","description":"บทที่ 1 หน้า 45 หอสมุดแห่งชาติ","link":"var ref = window.open('https://www.facebook.com/pages/หอสมุดแห่งชาติ-Library-national/413758945348366?fref=ts', '_blank', 'location=no,toolbar=no,hardwareback=yes');","status":true}
						],				
				"video":[
							{"header":"รู้จักกับหลักปรัชญาของเศรษฐกิจ...","description":"บทที่ 1 หน้า 32 ปรัชญาของเศรษฐกิจพอเพียง","link":"var ref = window.open('https://www.youtube.com/watch?v=G1arbHJVuEw', '_blank', 'location=no,toolbar=no,hardwareback=yes');","status":true}
						],				
				"link":[
							{"header":"เว็บมหาวิทยาลัยรามคำแหง","description":"บทที่ 1 หน้า 17 มหาวิทยาลัยเปิดของรัฐ","link":"var ref = window.open('http://www.ru.ac.th/th/', '_blank', 'location=no,toolbar=no,hardwareback=yes');","status":true},
							{"header":"เว็บมหาวิทยาลัยสุโขทัยธรรมาธิราช","description":"บทที่ 1 หน้า 17 มหาวิทยาลัยเปิดของรัฐ","link":"var ref = window.open('http://www.stou.ac.th/ourking.html', '_blank', 'location=no,toolbar=no,hardwareback=yes');","status":true}
						],				
				"map":[
							{"header":"มหาวิทยาลัยรามคำแหง","description":"บทที่ 1 หน้า 17 มหาวิทยาลัยเปิดของรัฐ","link":"var ref = window.open('https://www.google.co.th/maps/place/มหาวิทยาลัยรามคำแหง/@13.7562561,100.6167329,17z/data=!3m1!4b1!4m5!3m4!1s0x30e29e1e6d77de73:0xafc4658f6317648e!8m2!3d13.7562561!4d100.6189216', '_blank', 'location=no,toolbar=no,hardwareback=yes');","status":true},
							{"header":"มหาวิทยาลัยสุโขทัยธรรมาธิราช","description":"บทที่ 1 หน้า 17 มหาวิทยาลัยเปิดของรัฐ","link":"var ref = window.open('https://www.google.co.th/maps/place/มหาวิทยาลัยสุโขทัยธรรมาธิราช/@13.911126,100.5353663,17z/data=!3m1!4b1!4m5!3m4!1s0x30e2837b9591b0e1:0xf01923824353130!8m2!3d13.911126!4d100.537555', '_blank', 'location=no,toolbar=no,hardwareback=yes');","status":true},
							{"header":"หอสมุดแห่งชาติ","description":"บทที่ 1 หน้า 45 ","link":"var ref = window.open('https://www.google.co.th/maps/place/หอสมุดแห่งชาติ/@13.7723056,100.5051153,15z/data=!4m2!3m1!1s0x0:0xa53d16a898cfeb4c?sa=X&sqi=2&ved=0ahUKEwiU9L36jOPPAhWGto8KHRuzCE8Q_BIIejAR', '_blank', 'location=no,toolbar=no,hardwareback=yes');","status":true}
						]};				
			_clearWorkspaceAll();
			_runEbookScanMainPage();
		}
		
		function _quit() {
			$('#mb-signout').modal('show');
		}
		
		function _saveRegEdit() {
			var oTemp = new Object();
		    var cId = localStorage.getItem("cFBid");
		    var cName = localStorage.getItem("cFBname");
			oTemp.fb_code = cId;//alert( cId );
			oTemp.fb_name = cName;
			oTemp.idsim = "";
			//oTemp.type = "01";//นักศึกษา
			oTemp.academy_code = "";
			oTemp.academysub = "";
			oTemp.status = "A";
			oTemp.idcode = $('#xRegiIdcode').val();
			oTemp.changwad = $('#xRegiChangwad').val();
			oTemp.amphur = $('#xRegiAmphur').val();
			oTemp.tambol = $('#xRegiTambol').val();
			//alert( oTemp.idcode );
			//alert( oTemp.amphur );
			var lPass = false;
			var cTemp1 = oTemp.idcode + "00";
			oTemp.type = "01";
			if ( cTemp1==oTemp.amphur ) {
				oTemp.type="02";
			}
			oTemp.prename_code = $('#xRegPrename').val();//alert(oTemp.prename_code);
			oTemp.firstname = $('#xRegEditName').val();
			oTemp.lastname = $('#xRegEditSurname').val();
			oTemp.nickname = $('#xRegEditNickname').val();
			oTemp.mobile = $('#xRegEditMobile').val();
			oTemp.email = $('#xRegEditEmail').val();
			oTemp.born = $('#xRegEditBorn').val();
			oTemp.gender_code = $('#xRegEditSex').val();
			oTemp.position = $('#xRegEditPosition').val();
			
			pageLoadingFrame('show','v2');//alert( oTemp.type );
			$.post(cWWWHeader + 'php/controlDB.php?method=register', { param1: JSON.stringify(oTemp)}, function(response){
				alert( response );
				pageLoadingFrame('hide','v2');
				//$('#modal_Event_respone').modal('show');
				oUser.rows[ 0 ].changwad = oTemp.changwad;
				oUser.rows[ 0 ].amphur = oTemp.amphur;
				oUser.rows[ 0 ].tambol = oTemp.tambol;
				oUser.rows[ 0 ].prename_code = oTemp.prename_code;
				oUser.rows[ 0 ].name = oTemp.firstname;
				oUser.rows[ 0 ].surname = oTemp.lastname;
				oUser.rows[ 0 ].nickname = oTemp.nickname;
				oUser.rows[ 0 ].mobile = oTemp.mobile;
				oUser.rows[ 0 ].email = oTemp.email;
				oUser.rows[ 0 ].born = oTemp.born;
				oUser.rows[ 0 ].gender = oTemp.gender_code;
				window.location.assign("index.html");
				
				//$("#xWorkspace2").hide();
				//$("#xWorkspace1").show();
				//$("#xMenuPopup").show();
			})
		}
				
		function _searchReg() {
			var oTemp = new Object();
			var lPass = true;
			oTemp.fb_code = oUser.fb_code;
			oTemp.fb_name = oUser.fb_name;
			oTemp.changwad = $("#xRegiChangwad").val();
			oTemp.amphur = $("#xRegiAmphur").val();
			oTemp.tambol = $("#xRegiTambol").val();
			oTemp.idcode = $("#xRegiIdcode").val();		
			oTemp.type = "01";			
			var cTemp = oTemp.idcode.trim();
			//oSystem.teacherCode = "48170";
			if ( cTemp == "" || cTemp.length != 10 ) {
				lPass = false;
			}
			var cTemp1 = cTemp + "00";
			if ( cTemp1 == oTemp.amphur ) {
				lPass = true;
				oTemp.type="02";
			}
			if ( !alRegi[ 0 ] || !alRegi[ 1 ] ) {
				lPass = false;
			}
			//alert( cTemp1 + "," + oTemp.amphur );
			//alert( cTemp1 == oTemp.amphur );
			//alert( lPass );
			//alert( "4817000"=="4817000");
			if ( lPass ) {
			pageLoadingFrame('show','v2');
			//alert( oSystem.teacherCode
			//alert( cWWWHeader + 'php/controlDB.php?method=getMemberByIdcode' );
			$.post(cWWWHeader + 'php/controlDB.php?method=getMemberByIdcode', { param1: JSON.stringify(oTemp)}, function(response){
				//alert( response );	
				oDummy = JSON.parse(response);
				pageLoadingFrame('hide','v2');
				if ( oDummy.total == 0 ) {
					oDummy.rows = [];oDummy.rows[ 0 ] = new Object();
					oDummy.rows[ 0 ].prename_code = "00";
					oDummy.rows[ 0 ].name = "";
					oDummy.rows[ 0 ].surname = "";
					oDummy.rows[ 0 ].nickname = "";
					oDummy.rows[ 0 ].mobile = "";
					oDummy.rows[ 0 ].email = "";
					oDummy.rows[ 0 ].born = "";
					oDummy.rows[ 0 ].gender_code = "00";
					oDummy.rows[ 0 ].idcode = "";
					oDummy.rows[ 0 ].type = "02";
				}
					if ( oDummy.rows[ 0 ].type == "02" ) 
						$("#xRegiIdCode2").html( " ลงทะเบียนครูผู้สอน" );
					else
						$("#xRegiIdCode2").html( " " +oTemp.idcode );
					$('#xRegi_Image').html( '<img src="https://graph.facebook.com/'+oUser.fb_code+'/picture?width=120&height=120"  class="img-thumbnail"/>' );
					$("#xRegBack1").hide();
					$("#xRegBack2").show();
					$("#xRegChangwad").html( $("#xRegiChangwad option:selected").html() );
					$("#xRegAmphur").html( $("#xRegiAmphur option:selected").html() );
					$("#xRegTambol").html( $("#xRegiTambol option:selected").html() );
					//alert("A");
					nLen = oPrename.prenames.length;
					$("#xRegPrename").empty();	
					for ( var i = 0; i< nLen; i++ ) {
						$('#xRegPrename').append($('<option>', { value: oPrename.prenames[ i ].code,text: oPrename.prenames[ i ].prename }));
					}
					nLen = oGender.genders.length;
					$("#xRegEditSex").empty();	
					for ( var i = 0; i< nLen; i++ ) {
						$('#xRegEditSex').append($('<option>', { value: oGender.genders[ i ].code,text: oGender.genders[ i ].gender }));
					}
					$("#xRegisterPage1").hide();
					$("#xRegisterPage2").show();
					//alert("C");
					$("#xRegPrename").val( oDummy.rows[ 0 ].prename_code );
					$("#xRegEditName").val( oDummy.rows[ 0 ].name );
					$("#xRegEditSurname").val( oDummy.rows[ 0 ].surname );
					$("#xRegEditNickname").val( oDummy.rows[ 0 ].nickname );
					$("#xRegEditMobile").val( oDummy.rows[ 0 ].mobile );
					$("#xRegEditEmail").val( oDummy.rows[ 0 ].email );
					$("#xRegEditBorn").val( oDummy.rows[ 0 ].born );
					$("#xRegEditSex").val( oDummy.rows[ 0 ].gender_code );
					//alert("D");
					//alert("E");
					//$("#xRegisterPage3").hide();
					//$("#xRegisterPage4").hide();
			});	
			}
		}

		function _barcodeEdit() {
			window.plugins.barcodeScanner.scan( function(result) {	
				$("#xSearchMemberText1").val( result.text );
				$('#modal_confirm_edit').modal('show');
				_searchMemberForEdit();
			}, function(error) {
				alert("Scanning failed: " + error);
			}
		)
	}
		function _barcodeIDcode() {
			var cResult;
			var cChangwad = $("#xRegiChangwad").val();
			var cAmphur = $("#xRegiAmphur").val();				
			if ( cChangwad.trim() == "" || cAmphur.trim() == "" ) return;
			window.plugins.barcodeScanner.scan( function(result) {	
				cResult = result.text;
				$("#xRegisterPage1").hide();
				var oTemp = new Object();
				oTemp.fb_code = oUser.fb_code;
				oTemp.fb_name = oUser.fb_name;
				//oTemp.changwad = $("#xRegiChangwad").val();
				//oTemp.amphur = $("#xRegiAmphur").val();
				//oTemp.tambol = $("#xRegiTambol").val();
				oTemp.idcode = result.text;
				pageLoadingFrame('show','v2');
				$.post(cWWWHeader + 'php/controlDB.php?method=getMemberByIdcode', { param1: JSON.stringify(oTemp)}, function(response){
					oDummy = JSON.parse(response);
					$("#xRegBack1").hide();
					$("#xRegBack2").show();
					pageLoadingFrame('hide','v2');
					if( oDummy.total == 0 ) { //ไม่เจอ
						$("#xRegChangwad").html( $("#xTeacChangwad option:selected").html() );
						$("#xRegAmphur").html( $("#xTeacAmphur option:selected").html() );
						$("#xRegTambol").html( $("#xTeacTambol option:selected").html() );
						nLen = oPrename.prenames.length;//alert( nLen );
						$("#xRegPrename").empty();	
						for ( var i = 0; i< nLen; i++ ) {
							$('#xRegPrename').append($('<option>', { value: oPrename.prenames[ i ].code,text: oPrename.prenames[ i ].prename }));
						}
						$("#xRegisterPage2").show();
					} else { //เจอ
						//$("#xRegisterPage2").show();
					}
				})
			}, function(error) {
				alert("Scanning failed: " + error);
			}
			)
		}
		
		function getSelectedText(elementId) {
			var elt = document.getElementById(elementId);

			if (elt.selectedIndex == -1)
				return null;

			return elt.options[elt.selectedIndex].text;
		}		
		function _barcodeSearch() {
			var cResult;
			window.plugins.barcodeScanner.scan( function(result) {	
				cResult = result.text;
				$("#xTeacSearch").hide();
				var oTemp = new Object();
				oTemp.fb_code = oUser.fb_code;
				oTemp.fb_name = oUser.fb_name;
				oTemp.changwad = oUser.rows[0].changwad;
				oTemp.amphur = oUser.rows[0].amphur;
				oTemp.tambol = oUser.rows[0].tambol;
				oTemp.idcode = result.text;
				pageLoadingFrame('show','v2');
				$.post(cWWWHeader + 'php/controlDB.php?method=getMemberByIdcode', { param1: JSON.stringify(oTemp)}, function(response){
					oDummy = JSON.parse(response);
					//alert( response );
					$("#xRegBack1").hide();
					$("#xRegBack2").show();
					pageLoadingFrame('hide','v2');
					if( oDummy.total == 0 ) { //ไม่เจอ
						$("#xTeacSearchError").show();						
					} else { //เจอ
						_showMemberDetail(0,2);
					}
				})
			}, function(error) {
				alert("Scanning failed: " + error);
			}
			)
		}
		
		function _barcode() {
			window.plugins.barcodeScanner.scan( function(result) {
				/*
					alert("We got a barcode\n" +
							  "Result: " + result.text + "\n" +
							  "Format: " + result.format + "\n" +
							  "Cancelled: " + result.cancelled);
				*/
						//var ref = window.open('https://docs.google.com/viewer?url=http://www.mkorsornor.com/math_mp.pdf', '_blank', "location=no,toolbar=no,hardwareback=yes");
						//var ref = window.open('https://www.youtube.com/embed/qVgnzJuGDBE', '_blank', "location=no,toolbar=no,hardwareback=yes");
						//var ref = window.open('https://docs.google.com/viewer?url=http://www.mkorsornor.com/Expo_Panom.ppt', '_blank', "location=no,toolbar=no,hardwareback=yes");
						//var ref = window.open('https://docs.google.com/viewer?url=http://www.mkorsornor.com/work2.doc', '_blank', "location=no,toolbar=no,hardwareback=yes");
						//var ref = window.open('https://docs.google.com/viewer?url=http://www.mkorsornor.com/math.xls', '_blank', "location=no,toolbar=no,hardwareback=yes");
						//ref.addEventListener('loadstart', function() { alert(event.url); });//Expo_Panom.ppt
						_clearWorkspaceAll();
						_runEbookScanMainPage();
						
				}, function(error) {
					alert("Scanning failed: " + error);
				}
			);
		}

		function _barcodeMap() {
			window.plugins.barcodeScanner.scan( function(result) {
				
					alert("ระบบได้อ่านข้อมูลประเภท  " + result.format + "\n" );
				
				//alert(result.text);
					$('#xWorkspace4').find('#xQRCodeProf').val( "อ่านรหัสได้" );	  //"<iframe "+result.text+"><iframe>"
					$('#xWorkspace4').find('#xAcaMapProf').html( '<iframe src="https://www.google.com/maps/embed?'+result.text+'" width="400" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>' );	
					oUser.rows[0].map_code = result.text;
				}, function(error) {
					alert("Scanning failed: " + error);
				}
			);
		}
		
		function _showFBImage() {	
			_resetDiv("xUserImage", '<img src="https://graph.facebook.com/'+oUser.fb_code+'/picture?width=120&height=120"/>');
			_resetDiv("xLoginTime",'เวลาที่เข้าใช้: '+ getTimeStamp());
		}

		function checkProfilePopup() {
			lProfilePopup = !lProfilePopup;
			//alert( lProfilePopup );
		}

		function _drawRegi() {
			if ( alRegi[ 0 ] ) 
				$("#xRegiIcon1").html('<span class="fa fa-check-square"></span>  กศน.จังหวัด');
			else
				$("#xRegiIcon1").html('<span class="fa fa-square-o"></span>  กศน.จังหวัด');
			if ( alRegi[ 1 ] ) 
				$("#xRegiIcon2").html('<span class="fa fa-check-square"></span>  กศน.อำเภอ');
			else
				$("#xRegiIcon2").html('<span class="fa fa-square-o"></span>  กศน.อำเภอ');
			if ( alRegi[ 2 ] )
				$("#xRegiIcon3").html('<span class="fa fa-check-square"></span>  กศน.ตำบล');
			else
				$("#xRegiIcon3").html('<span class="fa fa-square-o"></span>  กศน.ตำบล');
		}
		
		function _getRegiChangwadPopup( n) {
			alRegi[ 0 ] = true;
			alRegi[ 1 ] = false;
			alRegi[ 2 ] = false;
			_drawRegi();
			var cChangwad = $('#xRegiChangwad').val();
			var cParam = cWWWHeader + "./assets/data/"+cChangwad+".json";
			var nTambol = 0;
			var nAmphur = 0;
			$.get( cParam )
			.success(function(data) {
				oOrganize = data;//alert( data );
				var nLen = oOrganize.amphurs.length;
				$("#xRegiAmphur").empty();	
				for ( var i = 0; i< nLen; i++ ) {
					$('#xRegiAmphur').append($('<option>', { value: oOrganize.amphurs[i].code,text: "กศน.อำเภอ"+oOrganize.amphurs[i].name }));
					if ( oUser.rows[0].amphur == oOrganize.amphurs[i].code ) {
						nTambol = i;
					}
				}
				$("#xRegiTambol").empty();
				nLen = oOrganize.amphurs[ nTambol ].tambols.length;
				for ( var i = 0; i< nLen; i++ ) {
					$('#xRegiTambol').append($('<option>', { value: oOrganize.amphurs[ nTambol ].tambols[ i ].code,text: "กศน.ตำบล"+oOrganize.amphurs[ nTambol ].tambols[ i ].name }));
				}
				if ( oUser.rows[0].changwad == cChangwad ) {
					$("#xRegiAmphur").val( oUser.rows[0].amphur );
					$("#xRegiTambol").val( oUser.rows[0].tambol );
				} else {
					$("#xRegiAmphur").val( oOrganize.amphurs[ 0 ].code );
					$("#xRegiTambol").val( oOrganize.amphurs[ 0 ].tambols[ 0 ].code );
				}
				var cTemp2 = $("#xRegiAmphur option:selected").html();
				$("#xRegiOrga").html('<h4><span class="glyphicon glyphicon-home"></span> '+cTemp2+'</h4>');
			}).fail(function() {
			});	
		}

		function _getRegiAmphurPopup(n)	{
			$("#xRegiIcon2").html('<span class="fa fa-check-square"></span>  กศน.อำเภอ');
			$("#xRegiIcon3").html('<span class="fa fa-square-o"></span>  กศน.ตำบล');
			var cTemp2 = $("#xRegiAmphur option:selected").html();
			$("#xRegiOrga").html('<h4><span class="glyphicon glyphicon-home"></span> '+cTemp2+'</h4>');

			alRegi[ 0 ] = true;
			alRegi[ 1 ] = true;
			alRegi[ 2 ] = false;
			_drawRegi();
			oOrganize.amphur = n;
			$("#xRegiTambol").empty();
			var nLen = oOrganize.amphurs[ n ].tambols.length;
			for ( var i = 0; i< nLen; i++ ) {
				$('#xRegiTambol').append($('<option>', { value: oOrganize.amphurs[ n ].tambols[ i ].code,text: "กศน.ตำบล"+oOrganize.amphurs[ n ].tambols[ i ].name }));
				if ( oOrganize.amphurs[ n ].tambols[ i ].code == oUser.rows[0].tambol ) {
					$("#xRegiTambol").val( oOrganize.amphurs[ n ].tambols[ i ].code );
				}
			}
		}
		
		function _getRegiTambolPopup(n) {
			$("#xRegiIcon3").html('<span class="fa fa-check-square"></span>  กศน.ตำบล');
			oOrganize.tambol = n;
			alRegi[ 0 ] = true;
			alRegi[ 1 ] = true;
			alRegi[ 2 ] = true;
			_drawRegi();
		}
		
		function appReg() {
			pageLoadingFrame('show','v2');
			$("#xWorkspace2").hide();
			$("#xWorkspace2").load("registerPage.html", function(response, status, request) {
				if( status == "success" ) {
					pageLoadingFrame('hide','v2');
					$("#xSubmenu").hide();
					$("#xMenuPopup").hide();
				
					oUser.rows = [{"changwad":"","amphur":"","tambol":""}];
					oUser.rows[0].changwad="48000";
					oUser.rows[0].amphur="4817000";
					oUser.rows[0].tambol="01";
					
					var nLen = oChangwad.changwad.length;
					$("#xRegiChangwad").empty();
					for ( i = 0; i< nLen; i++ ) {
						$('#xRegiChangwad').append($('<option>', { value: oChangwad.changwad[i].code,text: "กศน.จังหวัด"+oChangwad.changwad[i].name }));
					}
					var cParam = cWWWHeader + "./assets/data/"+oUser.rows[0].changwad+".json";
					var oTemp = new Object();
					$.get( cParam )
					.success(function(data) {
						oOrganize = data;
						var nLen = oOrganize.amphurs.length;
						for ( var i = 0; i< nLen; i++ ) {
							$('#xRegiAmphur').append($('<option>', { value: oOrganize.amphurs[i].code,text: "กศน.อำเภอ"+oOrganize.amphurs[i].name }));
							if ( oUser.rows[0].amphur == oOrganize.amphurs[i].code ) {
								nTambol = i;
							}
						}
						$("#xRegiTambol").empty();
						nLen = oOrganize.amphurs[ nTambol ].tambols.length;
						for ( var i = 0; i< nLen; i++ ) {
							$('#xRegiTambol').append($('<option>', { value: oOrganize.amphurs[ nTambol ].tambols[ i ].code,text: "กศน.ตำบล"+oOrganize.amphurs[ nTambol ].tambols[ i ].name }));
						}
						//alert( "cAmphur" );
						$("#xRegiAmphur").val( oUser.rows[0].amphur );			
						$("#xRegiChangwad").val( oUser.rows[0].changwad );
						$("#xRegiTambol").val( oUser.rows[0].tambol );
						$("#xWorkspace2").show();
				var cFBCode = localStorage.getItem("cFBid");
				var cFBName =localStorage.getItem("cFBname");
				//alert( localStorage.getItem("cFBid") );
					//alert( cFBCode );
					var cTemp2 = $("#xRegiAmphur option:selected").html();
					//$("#xRegiOrga").html("<h4>"+cTemp2+"</h4>");
					$("#xRegiOrga").html('<h4><span class="glyphicon glyphicon-home"></span> '+cTemp2+'</h4>');
					$("#xRegiImage").html('<table width="100%" border="0" cellspacing="10" cellpadding="10"><tr><td align="center" valign="middle"><img src="https://graph.facebook.com/'+cFBCode+'/picture?width=120&height=120" align="middle"/></td></tr><tr><td align="center" valign="middle"><h5>'+cFBName+'</h5></td></tr></table>');
					//$("#xRegiOrga").html('<h4>'+cFBName+'</h4>');
					}).fail(function() {
					});	
				}
				});
			}

		function appInit() {
			oElibrary = new Object();
			//_getElibraryData();
			//alert(99);
		   oUser.friends = {"friend":[
				{"idno":"34820","acacode":"4817001","fbcode":"114233309038829","fbname":"ศตายุ เตโช","fname":"ศตายุ","lname":"เตโช","nname":"เอก","gender":"ช","mobile":"0814253248","email":"eak_eak@gmail.com","address1":"24/2 ต.โพนทอง","address2":"อ.เรณูนคร จ.นครพนม"},
				{"idno":"34868","acacode":"4817001","fbcode":"114233309038830","fbname":"ธรรมรัตน์ บุตรราช","fname":"ธรรมรัตน์","lname":"บุตรราช","nname":"ท๊อป","gender":"ช","mobile":"0904575525","email":"top_2000@gmail.com","address1":"11 หมู่ 3 ต.โพนทอง","address2":"อ.เรณูนคร จ.นครพนม"},
				{"idno":"34871","acacode":"4817001","fbcode":"114233309038831","fbname":"นำแสง โกพลรัตน์","fname":"นำแสง","lname":"โกพลรัตน์","nname":"แสง","gender":"ช","mobile":"0866545522","email":"numseang12@gmail.com","address1":"20 หมู่ 2  ต.โพนทอง","address2":"อ.เรณูนคร จ.นครพนม"},
				{"idno":"34879","acacode":"4817001","fbcode":"114233309038832","fbname":"วีรวีย์ พรมนิล","fname":"วีรวีย์","lname":"พรมนิล","nname":"วี","gender":"ช","mobile":"0852253255","email":"vv.vv.vv@gmail.com","address1":"18 หมู่ 3 ต.โพนทอง","address2":"อ.เรณูนคร จ.นครพนม"},
				{"idno":"34883","acacode":"4817001","fbcode":"114233309038833","fbname":"สิรภัทร อินติยะ","fname":"สิรภัทร","lname":"อินทร์ติยะ","nname":"แม๊ก","gender":"ช","mobile":"089894423","email":"max77@gmail.com","address1":"50 หมู่ 1 ต.โพนทอง","address2":"อ.เรณูนคร จ.นครพนม"},
				{"idno":"35068","acacode":"4817001","fbcode":"114233309038834","fbname":"เฟื่องลดา แก่นจันทร์","fname":"เฟื่องลดา","lname":"แก่นจันทร์","nname":"นก","gender":"ญ","mobile":"0848722221","email":"f.keanchan@gmail.com","address1":"44 หมู่ 1 ต.โพนทอง","address2":"อ.เรณูนคร จ.นครพนม"},
				{"idno":"35070","acacode":"4817001","fbcode":"114233309038835","fbname":"มณฑิตา วิโย","fname":"มณฑิตา","lname":"วิโย","nname":"แอ้ม","gender":"ญ","mobile":"0814463325","email":"p.p.p@gmail.com","address1":"33 หมู่ 3 ต.โพนทอง","address2":"อ.เรณูนคร จ.นครพนม"},
				{"idno":"34820","acacode":"4817001","fbcode":"114233309038836","fbname":"สุดารัตน์ พรมนิล","fname":"สุดารัตน์","lname":"พรมนิล","nname":"แหว๋ว","gender":"ญ","mobile":"0894177103","email":"loveme.loveyou@gmail.com","address1":"15/1 หมู่ 2 ต.โพนทอง","address2":"อ.เรณูนคร จ.นครพนม"},
				{"idno":"34820","acacode":"4817001","fbcode":"114233309038837","fbname":"วันเพ็ญ โกพลรัตน์","fname":"วันเพ็ญ","lname":"โกพลรัตน์","nname":"มด","gender":"ญ","mobile":"083450129","email":"papamama.xyz@gmail.com","address1":"18 หมู่ 1 ต.โพนทอง","address2":"อ.เรณูนคร จ.นครพนม"},
				{"idno":"34820","acacode":"4817001","fbcode":"114233309038838","fbname":"ผกามาศ อัตติยะ","fname":"ผกามาศ","lname":"อัตติยะ","nname":"น้ำ","gender":"ญ","mobile":"085224563","email":"paka2016@gmail.com","address1":"27 หมู่ 3 ต.โพนทอง","address2":"อ.เรณูนคร จ.นครพนม"}
			]};
/*			
			oEbooks = new Object();
			oEbooks = {
	"ebooks": [{
		"isbn": "9786167483245",
		"code": "ทช11001",
		"name": "เศรษฐกิจพอเพียง",
		"author": "ขจีวรรณ จิตรสถาพร",
		"page": "",
		"year": "",
		"edition": "",
		"price": "60",
		"ebook": {
			"data": [{
				"header": "เนื้อหาเต็มเล่ม",
				"description": "",
				"link": "https://docs.google.com/viewer?url=http://www.pattanadownload.com/download/g.6/g6.21%20%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B9%80%E0%B8%99%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%AB%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%A3%E0%B8%B9%E0%B9%89/%E0%B9%80%E0%B8%A8%E0%B8%A3%E0%B8%A9%E0%B8%90%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%9E%E0%B8%AD%E0%B9%80%E0%B8%9E%E0%B8%B5%E0%B8%A2%E0%B8%87%20%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%96%E0%B8%A1%20%E0%B8%97%E0%B8%8A11001.pdf",
				"status": true
			}]
		},
		"exam": {},
		"cai": {},
		"link": {}
	}, {
			"isbn" : "9780755434110",
			"name" : "ทักษะการเรียนรู้",
			"author" : "ดร.สมประสงค์ วิทยเกียรติ",
			"page" : "315",
			"year" : "2556",
			"edition" : "1",
			"price" : "180",
			"ebook" : {"data":[{"header":"เนื้อหาก่อนบทที่ 1","description":"บทนำ สารบัญ คำชี้แจง ...","link":"https://docs.google.com/viewer?url="+cWWWHeader+"ebooks/myTest.pdf","status":true},{"header":"บทที่ 1 การเรียนรู้ด้วยตนเอง","description":"ทักษะพื้นฐานด้านต่าง ๆ ...","link":"https://docs.google.com/viewer?url="+cWWWHeader+"ebooks/san.pdf","status":true},{"header":"บทที่ 2 การใช้แหล่งเรียนรู้","description":"ห้องสมุดประชาชน ...","link":"https://docs.google.com/viewer?url="+cWWWHeader+"ebooks/000001_03.pdf","status":false},{"header":"บทที่ 3 การจัดการเรียนรู้","description":"ทักษะการจัดการความรู้ ...","link":"https://docs.google.com/viewer?url="+cWWWHeader+"ebooks/000001_04.pdf","status":false},{"header":"บทที่ 4 การคิดเป็น","description":"การวิเคราะห์ การแก้ปัญหา ...","link":"https://docs.google.com/viewer?url="+cWWWHeader+"ebooks/000001_05.pdf","status":false},{"header":"บทที่ 5 การวิจัยอย่างง่าย","description":"สถิติ ความสำคัญ ...","link":"https://docs.google.com/viewer?url="+cWWWHeader+"ebooks/000001_06.pdf","status":false},{"header":"บทที่ 6 ทักษะการเรียนรู้","description":"การพัฒนาอาชีพในพื้นที่ ...","link":"https://docs.google.com/viewer?url="+cWWWHeader+"ebooks/000001_07.pdf","status":true}]},
			"exam" : {"exam_id":"000001",
				"data":[
						{"header":"ข้อสอบบทที่ 1","description":"จำนวน 10 ข้อ, 4 ตัวเลือก","score":10,"correct":8,"lesson":1,"status":true},
						{"header":"ข้อสอบบทที่ 2","description":"จำนวน 10 ข้อ, 4 ตัวเลือก","score":10,"correct":7,"lesson":2,"status":true},
						{"header":"ข้อสอบบทที่ 3","description":"จำนวน 10 ข้อ, 4 ตัวเลือก","score":10,"correct":4,"lesson":3,"status":true},
						{"header":"ข้อสอบบทที่ 4","description":"จำนวน 10 ข้อ, 4 ตัวเลือก","score":10,"correct":0,"lesson":4,"status":false},
						{"header":"ข้อสอบบทที่ 5","description":"จำนวน 10 ข้อ, 4 ตัวเลือก","score":10,"correct":0,"lesson":5,"status":false},
						{"header":"ข้อสอบบทที่ 6","description":"จำนวน 10 ข้อ, 4 ตัวเลือก","score":10,"correct":0,"lesson":6,"status":false},
						{"header":"ข้อสอบระคน","description":"จำนวน 20 ข้อ, 4 ตัวเลือก","score":10,"correct":0,"lesson":5,"status":false}
						]},
			"cai" : {"exam_id":"000001","cai_pnt":1,
				"data":[
						{"header":"บทที่ 1 การเรียนรู้ด้วยตนเอง","description":"4 หน่วย, แบบทดสอบ 40 ข้อ","lesson":1,"process":80,"status":true,"objective":["1.จุดประสงค์การเรียนรู้ 1","2.จุดประสงค์การเรียนรู้ 2","3.จุดประสงค์การเรียนรู้ 3","4.จุดประสงค์การเรียนรู้ 4","5.จุดประสงค์การเรียนรู้ 5"],"submenu":["1.1 ความหมาย ความสำคัญและกระบวนการเรียนรู้ด้วยตนเอง","1.2 ทักษะพื้นฐานทางด้านการศึกษาหาความรู้","1.3 ทักษะการพูดและการทำแผนผังความคิด","1.4 ปัจจัยที่ทำให้การเรียนรู้ด้วยตนเองประสบความสำเร็จ"],"type":["ppt","pdf","doc","xls"],"documents":[],"live":"var ref = window.open('https://www.youtube.com/watch?v=G1arbHJVuEw', '_blank', 'location=no,toolbar=no,hardwareback=yes');"},
						{"header":"บทที่ 2 การใช้แหล่งเรียนรู้","description":"3 หน่วย, แบบทดสอบ 30 ข้อ","lesson":2,"process":72,"status":true,"submenu":[]},
						{"header":"บทที่ 3 การจัดการความรู้","description":"3 หน่วย, แบบทดสอบ 30 ข้อ","lesson":3,"process":55,"status":true,"submenu":[]},
						{"header":"บทที่ 4 การคิดเป็น","description":"5 หน่วย, แบบทดสอบ 50 ข้อ","lesson":4,"process":30,"status":true,"submenu":[]},
						{"header":"บทที่ 5 การวิจัยอย่างง่าย","description":"5 หน่วย, แบบทดสอบ 50 ข้อ","lesson":5,"process":0,"status":false,"submenu":[]},
						{"header":"บทที่ 6 ทักษะการเรียนรู้...","description":"4 หน่วย, แบบทดสอบ 40 ข้อ","lesson":6,"process":0,"status":false,"submenu":[]}
						]},
			"link" : {
				"facebook":[
							{"header":"เพจหอสมุดแห่งชาติ","description":"บทที่ 1 หน้า 45 หอสมุดแห่งชาติ","link":"var ref = window.open('https://www.facebook.com/pages/หอสมุดแห่งชาติ-Library-national/413758945348366?fref=ts', '_blank', 'location=no,toolbar=no,hardwareback=yes');","status":true}
						],				
				"video":[
							{"header":"รู้จักกับหลักปรัชญาของเศรษฐกิจ...","description":"บทที่ 1 หน้า 32 ปรัชญาของเศรษฐกิจพอเพียง","link":"var ref = window.open('https://www.youtube.com/watch?v=G1arbHJVuEw', '_blank', 'location=no,toolbar=no,hardwareback=yes');","status":true}
						],				
				"link":[
							{"header":"เว็บมหาวิทยาลัยรามคำแหง","description":"บทที่ 1 หน้า 17 มหาวิทยาลัยเปิดของรัฐ","link":"var ref = window.open('http://www.ru.ac.th/th/', '_blank', 'location=no,toolbar=no,hardwareback=yes');","status":true},
							{"header":"เว็บมหาวิทยาลัยสุโขทัยธรรมาธิราช","description":"บทที่ 1 หน้า 17 มหาวิทยาลัยเปิดของรัฐ","link":"var ref = window.open('http://www.stou.ac.th/ourking.html', '_blank', 'location=no,toolbar=no,hardwareback=yes');","status":true}
						],				
				"map":[
							{"header":"มหาวิทยาลัยรามคำแหง","description":"บทที่ 1 หน้า 17 มหาวิทยาลัยเปิดของรัฐ","link":"var ref = window.open('https://www.google.co.th/maps/place/มหาวิทยาลัยรามคำแหง/@13.7562561,100.6167329,17z/data=!3m1!4b1!4m5!3m4!1s0x30e29e1e6d77de73:0xafc4658f6317648e!8m2!3d13.7562561!4d100.6189216', '_blank', 'location=no,toolbar=no,hardwareback=yes');","status":true},
							{"header":"มหาวิทยาลัยสุโขทัยธรรมาธิราช","description":"บทที่ 1 หน้า 17 มหาวิทยาลัยเปิดของรัฐ","link":"var ref = window.open('https://www.google.co.th/maps/place/มหาวิทยาลัยสุโขทัยธรรมาธิราช/@13.911126,100.5353663,17z/data=!3m1!4b1!4m5!3m4!1s0x30e2837b9591b0e1:0xf01923824353130!8m2!3d13.911126!4d100.537555', '_blank', 'location=no,toolbar=no,hardwareback=yes');","status":true},
							{"header":"หอสมุดแห่งชาติ","description":"บทที่ 1 หน้า 45 ","link":"var ref = window.open('https://www.google.co.th/maps/place/หอสมุดแห่งชาติ/@13.7723056,100.5051153,15z/data=!4m2!3m1!1s0x0:0xa53d16a898cfeb4c?sa=X&sqi=2&ved=0ahUKEwiU9L36jOPPAhWGto8KHRuzCE8Q_BIIejAR', '_blank', 'location=no,toolbar=no,hardwareback=yes');","status":true}
						]}	
	}, {
		"isbn": "9789742219451",
		"code": "พต21001",
		"name": "ภาษาอังกฤษในชีวิตประจำวัน",
		"author": "ปรียาพร อภิเดชและคณะ",
		"page": "",
		"year": "",
		"edition": "",
		"price": "100",
		"ebook": {
			"data": [{
				"header": "เนื้อหาเต็มเล่ม",
				"description": "",
				"link": "https://docs.google.com/viewer?url=http://www.pattanadownload.com/download/g.6/g6.21%20%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B9%80%E0%B8%99%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%AB%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%A3%E0%B8%B9%E0%B9%89/%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B2%E0%B8%AD%E0%B8%B1%E0%B8%87%E0%B8%81%E0%B8%A4%E0%B8%A9%20%E0%B8%A1.%E0%B8%95%E0%B9%89%E0%B8%99.pdf",
				"status": true
			}]
		},
		"exam": {},
		"cai": {},
		"link": {}
	}, {
		"isbn": "9789742219451",
		"code": "พต21001",
		"name": "ภาษาอังกฤษในชีวิตประจำวัน",
		"author": "ปรียาพร อภิเดชและคณะ",
		"page": "",
		"year": "",
		"edition": "",
		"price": "100",
		"ebook": {
			"data": [{
				"header": "เนื้อหาเต็มเล่ม",
				"description": "",
				"link": "https://docs.google.com/viewer?url=http://www.pattanadownload.com/download/g.6/g6.21%20%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B9%80%E0%B8%99%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%AB%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%A3%E0%B8%B9%E0%B9%89/%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B2%E0%B8%AD%E0%B8%B1%E0%B8%87%E0%B8%81%E0%B8%A4%E0%B8%A9%20%E0%B8%A1.%E0%B8%95%E0%B9%89%E0%B8%99.pdf",
				"status": true
			}]
		},
		"exam": {},
		"cai": {},
		"link": {}
	}, {
		"isbn": "9789742219833",
		"code": "พค31001",
		"name": "คณิตศาสตร์",
		"author": "วัลภา ยี่สาร",
		"page": "",
		"year": "",
		"edition": "",
		"price": "170",
		"ebook": {
			"data": [{
				"header": "เนื้อหาเต็มเล่ม",
				"description": "",
				"link": "https://docs.google.com/viewer?url=http://www.pattanadownload.com/download/g.6/g6.21%20%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B9%80%E0%B8%99%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%AB%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%A3%E0%B8%B9%E0%B9%89/%E0%B8%84%E0%B8%93%E0%B8%B4%E0%B8%95%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C%20%E0%B8%A1.%E0%B8%9B%E0%B8%A5%E0%B8%B2%E0%B8%A2%20%E0%B8%9E%E0%B8%8431001.pdf",
				"status": true
			}]
		},
		"exam": {},
		"cai": {},
		"link": {}
	}]
}
*/			
		   _initFirebase();
		   
		   _resetDiv("xUserName", oUser.name);	  

		   _showFBImage();
		   $("#xWorkspace1").show();
		   //alert( oUser.rows[0].changwad + "," + oUser.rows[0].amphur + "," + oUser.rows[0].tambol );
		   
			var cParam = cWWWHeader+"php/controlDB.php?method=getFriends& param1="+ oUser.rows[0].changwad + "& param2="+oUser.rows[0].amphur+"& param3="+oUser.rows[0].tambol;
				$.get( cParam )
				.success(function(data) {
					//oUser.friends = new Object();
					oUser.friends  = JSON.parse( data );
					$("#xFriendCount").html( oUser.friends.total );
				}).fail(function() {
				});
		}

		function menuBack( n ) {
			if ( n ) $("#xMenuBack").show();else $("#xMenuBack").hide();
		}

		function _back() {
			//alert( oPageControl.name[ oPageControl.pnt - 1 ] );
			//alert(oUser.path);
			if ( oUser.path == "live_mainPage" ) {
				$("#xWorkspace2").html("");
			}
			$( "#"+oPageControl.name[ oPageControl.pnt - 1 ] ).hide();
			--oPageControl.pnt;
			$( "#"+oPageControl.name[ oPageControl.pnt - 1 ] ).show();
			if ( oUser.path == "afterscanPage" ) {
				$("#xSubmenu").show();
			}
			if ( oPageControl.pnt == 1 ) {
				oUser.path = "mainPage";
				menuBack( false );
				$("#xSubmenu").show();
			}
			if ( oUser.path == "friendsPage" ) {
				oUser.path = "mainPage";
				$("#xWorkspace2").html("");
				$("#xWorkspace1").show();
				menuBack( false );
			}
		}
		
		function addPage( c ) {
			++oPageControl.pnt;
			oPageControl.name[ oPageControl.pnt - 1 ] = c;
		}
		
		function subPage() {
			--oPageControl.pnt;
			//oPageControl.name[ oPageControl.pnt - 1 ] = c;
		}

		function onBackKeyDown() {
			//alert("Back");
		}
		
		function appStart(){
			document.addEventListener("backbutton", onBackKeyDown, false);
		   oUser = new Object();	   
		   var cId = localStorage.getItem("cFBid");
		   var cName = localStorage.getItem("cFBname");
		   var cPath = localStorage.getItem("cPath");//alert( cId );
			var cParam = cWWWHeader+"php/controlDB.php?method=getMember& param1="+ cId;
			_initParameter();
				$.get( cParam )
				.success(function(data) {
					//alert( data );
					var oTemp  = JSON.parse( data );
					//_initParameter();
					if ( oTemp.total > 0 ) {	
						oUser = oTemp;
						oUser.id = oTemp.rows[ 0 ].id;
						oUser.type = oTemp.rows[ 0 ].type;
						appInit();
						addPage( "xWorkspace1" );
					} else {
						oUser = new Object();
						oUser.fb_code = cId;
						oUser.fb_name = cName;
						oUser.path = cPath;
						oUser.type = "G";
						appReg();
					}				
				}).fail(function() {
						//alert("การเชื่อมต่อกับ facebook มีปัญหา โปรดตรวจสอบการเชื่อมต่อ และเข้าสู่ facebook ใหม่อีกครั้ง");						
						oUser = new Object();
						oUser.fb_code = cId;
						oUser.fb_name = cName;
						oUser.path = cPath;
						oUser.type = "G";
						appReg();
				});	
		}
												  