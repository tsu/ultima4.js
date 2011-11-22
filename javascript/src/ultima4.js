var ultima4 = {};

ultima4.gameData = (function() {
  var tiles = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEABAMAAACuXLVVAAAAAXNSR0IArs4c6QAAACpQTFRFAAAAIRuuajMEvhokuEEEX1P+/kpXcHRvH9IepKeiMObGWf5Z3/YK/f78g5MKeQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sLDBAOMsNZF5sAABlmSURBVHja3V09ciO7ruZI/p15rDregUorUJU2MIEXMIlzR46dOXWo0Kkzx46cK3kLOAE3wL28xj9AsiXZd86dU689I6hbUuMjCAIkAbJTukl83P0i+v6G5Oo5Bbrnr+12KRy5xP/uKO33kLbXFEA6v7tD+v39PXUY9vs98ycE1y/p9fV1elNr/O+O6hHIZ7m2127ctwACSOD9fceFlfK2ABDC9C+XXGrJ+udLWITXxDRXhpNNTHzt5i9hjRXwnsbHnv4rgIk5vFQqqMrAl7BYSUutLILsBUDXvt1w6e8Ywvv0v1UBlUKjA4UqEooOQLKUsJJAKpcUT1sAek1rgaWQ3plPg0KqIXkhTIWmojFlBgoA5cPVMwsg3dyYDriKaDVe+dsHcOda9F5ZaqDykbFi4EtTNcDfdMX+pl/OsD54EABtBPgHFFlVUrlM/KHuiyjcEIAo4cl2QABQI6CiZ2sHXGr5L2qQch0exSlhbwc8CK1/rhpuBNyW+T82hemmzDydCMCZArMDE9edR9EqoNMBvH0hS5hbAGJ7jgLodWCXdocUkJqAGDhoZwCgjgAAcQBK7gCgCLwdmDdGAoDYX79mNART0QmAN75ZjW+tHoA1kQgg2oE00ESoBgHwmvi1UkMYOCO1iTWXYwBS1xiJ5W43awlf+T9Ufy1fB3CTOjvw/aA/6A7S/pE7jmgOS+Dk4+kRXi+fzJXIsZ4OfLNYffamOXqvMuxQKAJ+kdKktN0K/wnBmo8D3MQDaPG1rkrTjxgCuHzE/1Tv8LLdAoLFesUvJA4DyFV0AEDN1lpcP4LPub1b238iAYiJWQKATSLWi7VJQBg3AKp6aVOAzOUtVGZXEwV8jv0Y318+gR6I00MBTCJYS8lVAxRA1BUDIJwz/sFLBTrZL+TN59evryoCev/kVKAagOYwxq0E+CVjJ0U6EhUFUAqyrwiw8N/L6ys6XiTXqgMCXgAE/UfaVEEdAMDKJ8eMRh0tCrltMvKoZNfA+YVerRWoBEQHegmEKsg1xVYPABJpMgEQpRMAqpSvBuDV24HMUiABrFX92y6numnsHXHHqRAAXwWifXbK2uirYCABEMEmmQTIIHWtADuHCIC6KVBSHaoQEraM2hhYZNdTvb9ev1y/TNxfXswOEMCJLDfLTbLyqx2KVUDViz0nBsDd56w2efokFXcOIpvIywTgGl5f6L20AroxsNgsk0nADFJXBdRPKNpDFntTamato44DXjCJdADIDnSmWATABmnWEKklFH1IVmLruXjLyIwJiErATDEBmG0FBnQOQOYvSCtQJzl2lqwD1tsTZxRawXFnlMMo7jP+mFuBMyvJS+AogJMc83/rqMEtVh5b52YkX6ObztIBrG3fM04EaMUPfi9jdjY9IwDY1Zu9AVci9cW+AKAKgMAYGqrdKR+QQPYlEG0aAcjN/ZvfJR0wi1/OZoKzdgyyKUjmKYHU0Or6EdnRHO+fmt9xDYBpdDRbqxRTisaZP8ePywz1PgiHI3ZfGSf779MFcEuZKFn4ym6CaM50g8rfw49bWvRnfF8afpVs9xcA7vuVe11U94XrKsdKBlMNP8jopKt8XCItdJ0H6NDTAUqDQrw/aDQB9N+XrhdXOHFnh6iVxW47kxjYV3LnLRU+x2+yn4O/IvMG/Du6f641fJ91oFQ+FZq1m0wASGRVJETIqQRZJ2Wy2IdKAkUJ0AfWikpqfl/aZph98+M7lwN2oIztQClH7ID/PXBAAEJTFTeZ9XNPK89GAi2jr0c6/H1xVHtEQp0K6OeeFm7InvqvdwAGvy9+HOIBpBMBlC8AKIPfJ+kYZNdByGKRi/RoQgcCLmf5uAy+zj5EfYn9Tn/vf/evOcrsfIL2qcK4p3ftRfx7bpxCOKD3xL3oeJ9GHN2MVt/ni5MxYCllRDMDAEshANx9aMK0lqEAFEoz8OkBcKd7HgBppZMA3yfL1N5QAIrFFX6xChIoOEFMCHKdB0D9kC0fcRRdm5GjE4B+QWtsre/YVGa0/VWVoAEgblfGB1h+N5pUAHUoAEGzXq9g2BMkIDMqWUc+pVdC7VeIYSAAKoF2Wr0TAMPB6ZfVmrWXxn5q5HlWVjl5AHR3h1ckwO3AAahDAfBXQAAkAgSy5lGR9n0kaNABKH62uvQ64AGUoQCIAw+7YRJoTeO/WmwkRW57WAXQkj0AaYaNuEsr8rZKpOQqARm7cfcEu3rYDKtMghEVAAyotwOmhEHpWqXE0Rc1BdEBGr5L/yhr5K4BUOsIgBlVD6AOBYA3J/m7VpBJt7J0oyBARpNNhwF0dkANUTQ8rWFy1nuxWvt5Tek6iiXMGqZQHcleN1wrWLsAajeT3Zjm3hLmWkPIpMjcTy+BYJgaO9A0vTIUAFRz7wWyn1fNZsvmnFGUQDuAn4km6Y8PesNYUYfdcacDRw4KmFztZkf4FiGtOQju55mQs5/8/isHxIh2z58HcAucbwHAz/QTXvT4dkPR2tvb25+HOJ/fSRgthtBPBnB7ywDOkgcA/AHB7e0RBAzgavcMUng+BqC9fktHOkv/IYDnqfhXJ1QBhSpbCZyB+NMZkJMBiOhVAhCnu3r+PIB0+5MBeB38BsynF2Q+RDAAMF8BRwFMvKH8yOfv/0UAf327SQBg+vzsBADPBGF3gg6YKykIAF+sEfzP338TgBv4d3t7Bv9+zjIWiqWflOC4BLhX1QCgOpik8FUAIABsCl8EcIYHKuGRKjggAbBEJwPg/rVWQYqGqFfCuZI7O3BKKwgXSgRwuBkeAQBm+CQJFPo/AkAvXwTwTI1gdzIAM0RnPxXAWfq8JfQ5DCf4gh7A2U+UwFm0xKc7I+FPAviCL5h0/HbgDOf7Ean+l2YsCsfrhHYAmmm1jmqMuXyJfepCQv8BgDyYJ2wOmVaZ/vhbVPJiEmj7cD3j7Gj5JIBFBJA0fJl40Jr9eKA08YEw2UpU5pJljrkHEAsgSRVCC2UQEPVxPefUdGBRLElKJ2DiCMrPb5URgIXG0dbJwhvVKCXV0QgSJ5lwfl/iCCSHyoFinsS2MaQbOBLNscqKJHVIXI+mMySYTHF9iWkzRUFnFrjELxIHJFy00krq4xtcVTJFWpIhWPjBMAcsOAEqy+x+4UhCkil9TnBgXcmNrLObowvBLE2C0ZDmaqVUhqpuyEr/Kk+eZtLuLKKU6Xqbtm+jadKa+AvyPabrBoCEuGQqV0UvSWldM+wMZZaglsz/54CrAbCCPwCwIiqGyAxSdlmfo/n9zlBw85c6yFznuW++ZACAcWIAaQSgmV/vp+c1vai4MGDWAKPogsYFm6ppAPCMjc7cfAaANPvM73PTCscAUpcDWh3tAfTxAZ3/LO2sdh2w66vwCIAuwvBPh+zJjxam9Q8f/45oiSatFD8taPA4FytEs21iMVtQurpk/1z7aHacyXH8ckg8lBxhm2/PrH0WdeL3fvqtNks9qsUpwv10Gi9pK9CMDE1v4RBK9ZHOmpTWMAWl9mkIQEy83o+VXflpyZSWcDOzzOYJ2EfUOQDVvs/RnKKFytUCXLk2APSHTUmyB+Dm1EszHRdE7eUrUm7vW0NSjCiTu1lQJq4Bcwy5jgCoaZTkBI7ju9KLzuXi+oSpTYpRAJYVxwCq6ECMD8SCnAKg+rQgXxUpDatATbPWdRlWga/KQ1UQm4/WyQEltPCLY6SRkUErKIeVMIX265phmmuGTXv3APw9vES1p9U0ww7AKYYopWiIQitok9ylvhMlKuj3nSGyzKrSmMbUmOIQoGBlbH+XVUl9lEyrQL9vlv9rg8vf74j+sDv+U/6/jy/8k55+MJPiAbS9SpfcSlrk/0elEotW/eh6DKDJk3AApENRYhJL1fYm9kEy9KxZVX+9jKYIZgGETqIaQPWOakV7d+0Ni7+eh2GqWQA2u64OQk2ljn8otStaSq0C77wEQE1fAdA4FwvLOxNbvK/XLpQZnjIXpzsBQC2Nc6m1Cb87cM69qsEsLlUhfUEHDEAzSD0GIFsHRuZu0mckILPrXsQlzCwcqQLXhQvZO58GwIkP5l5FDXJpOyy16WRql6rMtLBTAGg3uag2BwCuo5K9fXDfNzDlK3Ygq/9Psmhx5OfNYOlAI3RMavmcHXCz61VW2agfHw+hzGRLGxATHDq3nwfwR5xRiLD8vxuOh9njO4nCE71rjjCtdWy94RsRWX/n1+E1qYBGkQVxxv8jADNp/G2OYfrOVNbf2To8XpOMpJl9pyLeJZHCOfH9lYR+QgIigOuXF09T+rHffyjBJb7FKBddZJCk4OcGoGRNt8e+QMkp+RmRRgCyANAWAu4TAiDie0mpWtXTmztm7JWDR52a3y5VaLKh5fBvsiy+r4IfeyO8Bjizo1Hu6e7XuQL45XNEKi0czthLo7UlleMFMAv8BgC+v4EACMArLjszCmX/8aFEuglcjjtVAaoAEYkDUKgOcHmALBlwg1AB8M4SuAbtfzFKZf9Q4tZtHQaQVAWcEiQDIHXxBrX//e17eicteIFFX279mQcAK6NdBIh5G4DEAH4FAJY4VRrdK1z1tBz++0TeoOD4RzCuufE5ANlEMAZw3gJgAYjspBVI3+yNGKdEQIg5sX+B93tYkT6pPzbC/UdOIY2giPLdqTVSALThwtH1hu/vshZ9opMuvNAfAUgvPwDAB/AmIDqBzhE1aX5W+bLRg7w5tt7w/a0DYFIAAB8/AIAAySn5bWHKXWOJkq2zPzczcGi94Ztui4GtwXSAIEDbJwAEJBe/FpHsQFIVSHcOgGy78bn1hiR4qP5rWoM6HO+7N84RycuvCOC3++IwyLV2b365AbDisPIcPd7r8d3HMJd02rHm7Mo5erzMJQwh4kKRoHaiTHHvFcmrnKN++spNSTlb5aNMbsmJiqDd34OTSOT6ak2xfaCrhi78QCWOWgKA6mfmw5oWsYbfoTlP5hy2fbnhnS+4aWBkkelicC6T2kkWKPlhkyTy2tRBE3w7B0M4iRrsKUgAU7kmCdD1O0nUXTFdNBQ/kAFU1UXyLg6Qi++DVIPD8XDtfxB/TiP6y/oltE57wXTFFN4IleB5lTET508jIAr7V9kGhi0ow0KqjL6TCnyjPCbXIUJlo+g2AvDnCEA3B9DBZOEJXNqFiuL7uC5Rd1Yotg3UeQSgiUznIwCL1NPMKzTBS5K7DEMxXAmZi9JKCw+wfvAL0gdDLXjrAUBmw2qBKetE10oXQG3ZRMlxKqRoRgeLvNC4FfkSVQB3DEC04C8DNjFeQFQbAazc+ZpolT0xtNnlFADIvgpZUkFylfmsKq39/E52+0IrgDKQ/vl6YshJJkRXSmkfg7CZVulThuJafR/jQKM1VAEGgCbSZbksfLaLApgx/ykGy73ptfh5LtIBkn7VN5K/65BhnR+gQ5fit1dLHYDqzJR0wL5zv+4b89eOWYJNG9YH6HEAuaSwyVnwDeczTl+vc33P0lOccW2qpR6YNusOylnlpE2hyc7/8cmEBsDznwLwDOm7V5REbEAolTM36/Fbyjiv8NuGucmEreYqAvWMdw29YgBhDle2lNOt5WQHM1gGIK92NfQV64AmSdo1SrnMCGTX51LlGqkuQNGd3HYpvJkruna/HQDRB68XXTJXaahsFCYJ6JqITtfzXNqhtRFjmLQqDUhKTR+rpVcKYEhlvWHWaAx4VfQobDGFo/CTgmtCtayKzSH1U4dQuyuq9asryv9uaLtOvl837xgKVSQ7m5uVNZE6lyQdlJ0WYEhlud8c7QEku8H0RvZU4E6hzzIlejVJYBdsiZwTPQrgqlG+FM8psiPT6EMAiRmOqSz3m6PA7+qZ6U7oMxunnZNAw1g6RtO38QZz9AQAiHQnKzlwe1Zc3SR63OX7+Z7/FcLczVJdbzhHzQoG8e0UyCwAaZdXz9zsxrSO9idxtFGgkTecAcBxIyxtSmaEBUBjimed0a5pOmKNDECbcGiJh0BRgs/k1piG03//gTss8XZvdAFO+Hp6HHRLbWvaYYf1IV3cA51eH07gf4nbrF0Cq4kibzyn63BBM7mqbXLlI7UPiRhd3BPjzwOAbb7gb6LAls71upbU5n5i37wFcJES0un1vk1oHSF49ABADs35cDDgj4nLPTBnxg8J3kH5FUAfAfEueWJ4ySW/ZADhPE4GtZNDiRgLABS7Argg0eQ4+ezOqTU9PdFWa0CfBucaKtV8fN1ZbDoFlg9Q1AegD/dTDTygFiB9ML6ZB5l6hZcNoPo/HaJtPL+J4V48TAfqgqMP90Tvk09hz9UH5wXAU6ICo9I9MQ3X2w1YSzy/uH8g5XtgJXx48NQBSGUA4FJETeSR6JNdb3Prmxh2x9CA3HcA0hDAJTKeo7lNHw4agEqIoseaeEjJquQiVoFbplT9GF/ae7QHvhmaB8qDveAvHu5R+aIy3st1N5eQUxMPLWKK0QB1AC47O9AZhOr0IBglaARsFQfWp90A75JbH9NHEr1ed0a/dvPxvR8IeE70Rq7dP7LyPbrr/RKGI97ok8cla/sc/e0M/33H0dH33EaEuZ7yMQT2PuIbpnLaLfPpMqrCdoHt1nFHAWA4zb9hqtd5gVP1NAyKs9t0J0l8UedwjwHguKa9YarXjwMIa9d8aLXYdoZlZvxdMJ4oBd5zgHPPcUapA1qA4GnwQW0YL9LMy/xys70pX/+xp7rG+CICISrXXczYUz9y6EocJdLsTxhpkdwGpZJvoufDxShhCWizYaJKoHCsm7cxlGl9T7MxVGoZL3udau13t3Q6kUebUrpWiju90UJU3stRKa2+2jetLjWN4hiAY2ouD43IAwloO/zw1NkDzHoZtf/K12s6NL10kp3aY4V/kPIxZz7nxIe50bdtr3eYQ7M/YUP3zEho8uc/qA56xmEbr3b/v5Z2uwkGuucSs+4rY+Of/O5Vofmr6SODp77B7aGZR3gCNfsTGe+dVjYZ2V3WQHNnx3GwP6FfnlhbDyCGMHiCU4LjoQ/mOH7qMCAfwS78+cMWn9WwlXM9dYcB1+/Ge/XL8c/v/kkAlgddeUvY3OSgnNvORnZYLMkDkO1dOZf7NACyCVeVfQmqbss1D+DcLln7r5qE4ZMx6sw2VzVWQeVNdysv63dVcARA4wMCTXH9WQxYxoEGb+RL++lGEz7UAVcF0Q0HegoAt5FyzbasvzRraGaThnxHxOeq+2WAh6pAGOvOzMy4xEzr87u72cBj7AsGGtZ4VTeuNu9Zc0jtCCkfbu11ABCqpNe5kJPTMWwBofaPAKQAIFRBoxO1HqbqdpXKyoPsNlIO+5Qk2+TiJENy0sCkOCrNTErOSuQk0D2z4pAhOdIhkeWGjmbOpuFQDuUj6h4ZubpHY/znANr9gI9sJ9x9fqozmqXGqAMQFq+2n9f0m0bzsk+ArC0TH8EX/Nb1/nM9P/WwzUXKn1mJqQBKGSP46vqINW8ruV4t1pw4Fc5Du0UA8oSTqMT5a0+AwlwQfrQIP2KEsmPkfAxAH6RgWeKaTddIYsu7ni7lYSL6hj6BvCza41Qo7znL57Y1S5L1TlW2l9dhNwevS+5XVi4FgD7NRN4sTwbAvW7t/mfZ5IT2yS8W6ZQgtpeEFTj5N8vpIACJHm2jdEEZU5AotdL9gYxmycYt+nQfKTk9v6yVhBU4yGS5lOebMCNl3ACaSk7j/kLj/yw2vRTrl1RX4k4SWgcbX/dLgWRKN6ZU91nrPFsfT+ILVHJ7AkuUhIpgoAQpNLsZKnVddDf6uAWNaX271oze4POciO8Gyj0Jf2K8YSCbpBssz1F5YAJTlYDb4SEuKW0kAQ9UAkbwaCkEsAEl2CAQpGva3XctW17zOVLfDNUOzAJoOjAqmanoS2A1UWoA2y02AKKLFfyh0iGVc3wlAOMHJrjrtY/WeWDbJdX6llv+ckPnRNe0w/MCAITmiNdX/hFS8XkFdn1mGKz7kG9Z77dsCrb8jCmkC2JIam/+YEXXI6M5ALN++ve4+zLTwylHezT5N7ntJTUaofCILHxMllzXTbbn6LEDAmKH6JIbMlNQKdTmpTVwqNwtG5ittzzb02JCEiRPl3ZudHIaVPKJLie2QKEF0znyntQbNBwYLhEdAUKzf4FR2nsNVHkK1yEIRckJE+WgFAXjBAALfAsUGW2WyFDPwcCAQm8RiFC+fvEAAcMHiBNCqDJQjGA+PT49QUoE0Uc5n0QyUapJvDvem24c6SbZeXKX+AQitRwxTRgqNUrXJzaPEJlkyucQFJvoI1tsKAvRTU8jwxaQBMmThG49vZfgGwIIVGLU+nzCJdENmC8woXZOFe4ovhWKMeKUZulRAMqItB/lTq9yjspGdg6rKqLA6DEzHFFjDI+kGwBRRnMAQOOgPTZUr2OwmuK2I6qMgSW+RiBYom1i7YbqZT8u50meIDlHL0QHJH8ghfNLav+PHZVmuSQurFEIAASr52nLPQ6im4ZivPpCIuaofBcJUknkXBlSu++ApLbk0qXS8yU/QpPopqHO6DC9uA9h/Et6HOFjR7lKiDXUOdn+jfgAPV9yiZfcJgJlb6HhektqkvNLKu0jWCSwP5dEH/V6y5i5GwWLt8VaIqEHuqRKEK3T3C1JX0A1fKQ0tSd7Ti4CUQBkdhNR6stC5QrdovvZME0N9e3Q3qQHd04lx8w0zJNjKtenkk6231F42WyUQnMjO7BkVXB0OfaGBgTd4OMl2Hx4eXw0ytf/D9PoVho2QzPVAAAAAElFTkSuQmCC";

  var rleMapData = "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/MSfCAgICAgICAgICAgICAinCAjPlfysnsG1rJ8ICAgICAgIn72XCAgH/Mn46KmTlwgICJKRkgcICAkIApn48OmVvp38rK8ICAgICAgIlwgICAgICO+d/KwG6aWcBwgICAgICAgICAiXvZcICJ/8sfj4AKGblwgIApmSCAiUCAKZ+PDplb6l/JS3CAgICMcICAgI5638pLGQuZ2cBwgICAgICAgICJe9lwgICJ/8qfj4kKmTlwgIAqGSCAQICAKZ+PCplbGdvqX8BKcICAgICKellwgI7638nAOpqLmVBKcICAgICAifrZ8ICAgICJ+smaS5+PiQqZOXCJK5BAiSmfjoqaWxlc6d9J8ICAgICKe93wgICKelrK28A6G4wb8ICKetlwgICAgICAgICJ8E+fj4kLGTnwLJCAKZ+OixpbGdzp3slwgICAgIn92flacICAgICK+dlL2skwKZuPG/nZ8ICAgICAiv+ZH4+JDBk5cCyZKZ+OiplZSVsZ3GpdyXCAg9CAif/aWnCAgICAgIp92kkwKhqNkICAjnCAgICAgIp/mh+PgA0ZOXAskCmfjosQWkBbGdzqXUlwgIBAgIl/29pwgICAgICKfNnJOaqZDBAgMHCAgICAgIxwgICAgIr/mp+PgA2ZsHAuH48KkFtAWxndalxJ8ICAiXxZTVrK8ICAgICK+9BJsCkwLZApuXCAgICAgICAifCAgICAgIr/mp+PiQkQLJm5LZ+PippJacqZ3epbyfCAgIB720tcynCAgICAgICKetBJOSmwK5AqOfCAgICAgICAgICAcICAi3k9mwmfj4kJGSyZsCwfj4mLGcppSxle6drJ8ICAiXnfzcBacICAgICAgIp5WUkwKbpJKRApOnCAgICAgICJ8ICLezwfj44JkCmQLBk7n4+KippKacsZXunaSXCAgIl5385J2nCAgICAgICKeUkxeTlJUEkwIBk5cICAgICAgICAiSt8vB+PjokZIBAwECwZOx+PiwqZy2nKmd5p2sBwgIl5X8/KWvCAgICAgIn5sCA5SdBJsBA5cICAgICAgICAiip5uSo8H4+OiZApEDAQLBk7H4+LCpnL6cqZ3mnaSn/PycvacICAgIpwORAwSlBJuRBwgICJIICAgICAKRAp+rAgOaufj46LGTAZLBA6n4+LC5nL6UsaXWnaSn/PyU1Z8ICK8D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";

  var font = "ffffffffffffffffffffffffffffffff00ffffffffffffff00ffffffffffffffffffffffffffff00ffffffffffffff0000ffffffffffff0000ffffffffffff003f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3ffcfcfcfcfcfcfcfcfcfcfcfcfcfcfcfc3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3cffc3c3c3c3c3c3ffffddffffffffddff00030f1f3f3f7f7f00030f1f3f3f7f7f00c0f0f8fcfcfefe00c0f0f8fcfcfefe7f7f3f3f1f0f03007f7f3f3f1f0f0300fefefcfcf8f0c000fefefcfcf8f0c000183c7e181818181818181818187e3c18183c7e18187e3c180000387c7c38000000030f3f3f0f030000030f3f3f0f030000c0f0fcfcf0c00000c0f0fcfcf0c000000000000000000000181818180018180036366c00000000006cfe6c6cfe6c0000103c70381c78100000666c183666000070d8d876dcdc760018183000000000000c18303030180c0060301818183060000010387c381000000018187e1818000000000000181830000000007c000000000000000000181878cccc78fc30303000386c6c6c6c6c38000818381818183c00386c0c1830607c00386c0c380c6c38006c6c6c7c0c0c0c007c60780c0c6c38000c1830786c6c38007c0c0c1830303000386c6c386c6c3800386c6c3c18306000001818001818000000181800181808000c18306030180c0000007c007c0000006030180c18306000386c0c18001818ffffffffffffffff000e1e36363e3666007c36363c36367c001c36606060663c007c36363636367c007e30303c30307e003e30303c303060001c3660606e663c006666667e666666007e18181818187e003e06060666663c00666c7870786c66003030303030386e0042667e7e666666004666767e6e6662003c66666666663c007c66667c606070003c666666666c36007c66667c6c6666001c36603c06663c007e181818181818006666666666663c0066666666663c1800666666667e66420066663c183c6666006666663c181818007e060c7e30607e007c60606060607c001e0e1a386c6c38007c0c0c0c0c0c7c000010386c0000000038fefefefe38000000007e7e3c7e000000003c6c6c6c360030303c3636366c0000003c6660663c000c0c3c6c6c6c360000003c667e603e001c36307e3030600000003c663e067c00606060786c6c66000018001818183c000c000c0c6c6c38006060666c786c66003818181818183c00000042667e66660000006c766666660000003c6666663c0000007c667c60700000003e663c0c060000006c766060600000003c603c067c0030307c3030361c0000006c6c6c6c360000006666663c1800000066667e6642000000663c183c6600000066663e0c380000007e0c18307e003c66663c183c18007cfec6d6decc600078fcccd8c2fe7c000c66f6d6c6fe7c007cfe8636667e3c";

  function rleDecode(data) {
    var buf = "";
    for (var i=0; i<data.length; i++) {
      var c = data.charCodeAt(i);
      if (c >= 128) {
        var code = c & 7;
        var n = (c>>3) & 15;
        for (var j=0; j<n; j++)
          buf += String.fromCharCode(code);
      } else {
        buf += String.fromCharCode(c);
      }
    }
    return buf;
  }

  return {
    tiles: tiles,
    worldMap: rleDecode(atob(rleMapData)),
    font: font
  };
}());

ultima4.main = (function() {
  function getMapTileAt(x, y) {
    return map.charCodeAt(y*256+x);
  }

  function drawChar(g, c, fgColor, bgColor, x, y) {
    if(c>=0 && c<=127) {
      for (var row=0; row<8; row++) {
        var b =  parseInt(ultima4.gameData.font.substr(c*8*2 + row*2, 2), 16);
        for (var i=7; i>=0; i--) {
          g.fillStyle = (b & (1<<i)) ? fgColor : bgColor;
          g.fillRect(x+8*2-(i+1)*2, y+row*2, 2, 2);
        }        
      }
    }
  }

  function drawText(g, s, fgColor, bgColor, x, y) {
    for (var i=0; i<s.length; i++) {
      drawChar(g, s.charCodeAt(i), fgColor, bgColor, x+i*8*2, y);
    }
  }

  function drawCharLine(g, c, fgColor, bgColor, x, y, dx, dy, n) {
    for(var i=0; i<n; i++) {
      drawChar(g, c, fgColor, bgColor, x, y);
      x += dx;
      y += dy;
    }
  }

  function drawTile(g, tile, x, y) {
    g.drawImage(tiles, (tile%16)*16, Math.floor(tile/16)*16, 16, 16, x, y, 32, 32);
  }

  function drawViewport(g, mapX, mapY) {
    var ox = 16 + 5*32;
    var oy = 16 + 5*32;
    for (var y=-5; y<=5; y++) {
      for (var x=-5; x<=5; x++) {
        var tile = !isTileInLineOfSight(x, y) ? tileType.empty : getMapTileAt(mapX+x,mapY+y);
        drawTile(g, tile, ox + x*32, oy + y*32);
      }
    }

    drawTile(g, 31, ox, oy);

    function isTileInLineOfSight(x, y) {
      var blockingTiles = numberOfSightBlockersOnLine(0, 0, x, y);
      if (blocksView(getMapTileAt(mapX+x,mapY+y)) && blockingTiles <= 1) {
        return true;
      } else {
        return blockingTiles == 0;
      }
    }

    function blocksView(tile) {
      return tile == tileType.mountain || tile == tileType.forrest;
    }

    function numberOfSightBlockersOnLine(x0, y0, x1, y1) {
      var origX1 = x1;
      var origY1 = y1;
      var steep = Math.abs(y1-y0) > Math.abs(x1-x0);
      if (steep) {
        var tmp = x0;
        x0 = y0;
        y0 = tmp;
        tmp = x1;
        x1 = y1;
        y1 = tmp;
      }

      if (x0 > x1) {
        var tmp = x0;
        x0 = x1;
        x1 = tmp;
        tmp = y0;
        y0 = y1;
        y1 = tmp;
      }

      var deltaX = x1 - x0;
      var deltaY = Math.abs(y1 - y0);
      var error = 0;
      var deltaError = deltaY/deltaX;
      var ystep = (y0 < y1) ? 1 : -1;
      var y = y0;
      var blockingTiles = 0;
      for (var x=x0; x<=x1; x++) {
        var tile = steep ? getMapTileAt(mapX+y,mapY+x) : getMapTileAt(mapX+x,mapY+y);
        if (!(y == 0 && x == 0) && blocksView(tile)) {
          blockingTiles += 1;
        }
        error = error + deltaError;
        if (error >= 0.5) {
          y += ystep;
          error -= 1.0;
        }
      }
      return blockingTiles;
    }
  }

  function drawScreenFrames(g) {
    drawTopRow();
    drawLeftColumn();
    drawBottomRow();
    drawCenterColumn();
    drawRightColumn();
    drawRightSideHorizontalBars();

    function drawTopRow() {
      drawChar(g, 16, palette[14], palette[0], 0, 0);
      drawCharLine(g, 4, palette[14], palette[1], 16, 0, 16, 0, 9);
      drawChar(g, 30, palette[14], palette[0], 10*16, 0);
      drawChar(g, 28, palette[14], palette[0], 13*16, 0);
      drawCharLine(g, 4, palette[14], palette[1], 14*16, 0, 16, 0, 9);
      drawChar(g, 0, palette[14], palette[0], 23*16, 0);
      drawCharLine(g, 4, palette[14], palette[1], 24*16, 0, 16, 0, 15);
      drawChar(g, 18, palette[14], palette[0], 39*16, 0);
    }

    function drawLeftColumn() {
      drawCharLine(g, 10, palette[14], palette[1], 0, 16, 0, 16, 22);
      drawChar(g, 20, palette[14], palette[0], 0, 23*16);
    }

    function drawBottomRow() {
      drawCharLine(g, 2, palette[14], palette[1], 16, 23*16, 16, 0, 5);
      drawChar(g, 30, palette[14], palette[0], 6*16, 23*16);
      drawChar(g, 28, palette[14], palette[0], 17*16, 23*16);
      drawCharLine(g, 2, palette[14], palette[1], 18*16, 23*16, 16, 0, 5);
    }

    function drawCenterColumn() {
      drawCharLine(g, 12, palette[14], palette[1], 23*16, 16, 0, 16, 8);
      drawChar(g, 8, palette[14], palette[1], 23*16, 9*16);
      drawChar(g, 12, palette[14], palette[1], 23*16, 10*16);
      drawChar(g, 8, palette[14], palette[1], 23*16, 11*16);
      drawCharLine(g, 12, palette[14], palette[1], 23*16, 12*16, 0, 16, 11);
      drawChar(g, 10, palette[14], palette[1], 23*16, 23*16);
    }

    function drawRightColumn() {
      drawCharLine(g, 8, palette[14], palette[1], 39*16, 16, 0, 16, 8);
      drawChar(g, 0, palette[14], palette[1], 39*16, 9*16);
      drawChar(g, 8, palette[14], palette[1], 39*16, 10*16);
    }

    function drawRightSideHorizontalBars() {
      drawCharLine(g, 6, palette[14], palette[1], 24*16, 9*16, 16, 0, 15);
      drawCharLine(g, 6, palette[14], palette[1], 24*16, 11*16, 16, 0, 15);
      drawChar(g, 4, palette[14], palette[1], 39*16, 11*16);
    }
  }

  function repaint() {
    var g = canvas.getContext("2d");
    g.fillStyle = '#000';
    g.fillRect(0, 0, canvas.width, canvas.height);
    drawScreenFrames(g);
    drawViewport(g, state.x, state.y);
    drawText(g, "1-TSU      125G", palette[1], palette[0], 24*16, 1*16);
    drawText(g, "2-MKA      125G", palette[1], palette[0], 24*16, 2*16);
    drawText(g, "F:0200   G:0200", palette[1], palette[0], 24*16, 10*16);
    drawText(g, "WIND SOUTH", palette[1], palette[0], 7*16, 23*16);
    drawText(g,"Welcome to", palette[1], palette[0], 24*16, 12*16);
    drawText(g,"Ultima IV", palette[1], palette[0], 24*16, 13*16);
    drawText(g, String.fromCharCode(30)+String.fromCharCode(125), palette[1], palette[0], 24*16, 15*16);
  }

  function mutateNorth(state) {
    return { x: state.x, y: state.y - 1 };
  }

  function mutateEast(state) {
    return { x: state.x + 1, y: state.y };
  }

  function mutateSouth(state) {
    return { x: state.x, y: state.y + 1 };
  }

  function mutateWest(state) {
    return { x: state.x - 1, y: state.y };
  }

  function moveCommand(mutator) {
    return function() {
      var newState = mutator(state);
      if (canMoveTo(newState.x, newState.y)) {
        state.x = newState.x;
        state.y = newState.y;
      }
    };

    function canMoveTo(mapX, mapY) {
      var ret = true;
      var tile = getMapTileAt(mapX, mapY);
      switch(tile) {
      case tileType.ocean:
      case tileType.river:
      case tileType.mountain:
        ret = false;
      }
      return ret;
    }
  }

  function createCommandMap() {
    var map = {};
    map[keys.up] = moveCommand(mutateNorth);
    map[keys.right] = moveCommand(mutateEast);
    map[keys.down] = moveCommand(mutateSouth);
    map[keys.left] = moveCommand(mutateWest);
    return map;
  }

  function keyDown(e) {
    var command = commands[e.keyCode];
    if (command) {
      command();
      repaint();
    }
  }

  function createCanvas() {
    var canvas = document.createElement("canvas");
    canvas.width = 320*2;
    canvas.height = 200*2;
    return canvas;
  }

  function createTiles() {
    var tiles = new Image();
    tiles.src = ultima4.gameData.tiles;
    tiles.onload = onFinishedLoading;
    return tiles;
  }

  function onFinishedLoading() {
    repaint();
  }

  var keys = {
    up: 38,
    left: 37,
    down: 40,
    right: 39
  };

  var tileType = {
    deepOcean: 0,
    ocean: 1,
    river: 2,
    grass: 4,
    bushes: 5,
    forrest: 6,
    hill: 7,
    mountain: 8,
    empty: 69
  };

  var state = {
    x: 86,
    y: 108
  };

  var palette = ["#000000", "#FDFEFC", "#BE1A24", "#30E6C6",
                 "#B41AE2", "#1FD21E", "#211BAE", "#DFF60A", 
		 "#B84104", "#6A3304", "#FE4A57", "#424540",
		 "#70746F", "#59FE59", "#5F53FE", "#A4A7A2"];

  var map = ultima4.gameData.worldMap;
  var tiles = createTiles();
  var canvas = createCanvas();
  var commands = createCommandMap();

  document.write("<body>");
  document.onkeydown = keyDown;
  document.body.appendChild(canvas);
}());