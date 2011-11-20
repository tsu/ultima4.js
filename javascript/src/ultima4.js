var ultima4 = {};

ultima4.gameData = (function() {
  var tiles = "data:image/png;base64,"+
    'iVBORw0KGgoAAAANSUhEUgAAAQAAAAEABAMAAACuXLVVAAAAAXNSR0IArs4c6QAAACpQTFRFAAAA'+
    'IRuuajMEvhokuEEEX1P+/kpXcHRvH9IepKeiMObGWf5Z3/YK/f78g5MKeQAAAAlwSFlzAAALEwAA'+
    'CxMBAJqcGAAAAAd0SU1FB9sLDBAOMsNZF5sAABlmSURBVHja3V09ciO7ruZI/p15rDregUorUJU2'+
    'MIEXMIlzR46dOXWo0Kkzx46cK3kLOAE3wL28xj9AsiXZd86dU689I6hbUuMjCAIkAbJTukl83P0i'+
    '+v6G5Oo5Bbrnr+12KRy5xP/uKO33kLbXFEA6v7tD+v39PXUY9vs98ycE1y/p9fV1elNr/O+O6hHI'+
    'Z7m2127ctwACSOD9fceFlfK2ABDC9C+XXGrJ+udLWITXxDRXhpNNTHzt5i9hjRXwnsbHnv4rgIk5'+
    'vFQqqMrAl7BYSUutLILsBUDXvt1w6e8Ywvv0v1UBlUKjA4UqEooOQLKUsJJAKpcUT1sAek1rgaWQ'+
    '3plPg0KqIXkhTIWmojFlBgoA5cPVMwsg3dyYDriKaDVe+dsHcOda9F5ZaqDykbFi4EtTNcDfdMX+'+
    'pl/OsD54EABtBPgHFFlVUrlM/KHuiyjcEIAo4cl2QABQI6CiZ2sHXGr5L2qQch0exSlhbwc8CK1/'+
    'rhpuBNyW+T82hemmzDydCMCZArMDE9edR9EqoNMBvH0hS5hbAGJ7jgLodWCXdocUkJqAGDhoZwCg'+
    'jgAAcQBK7gCgCLwdmDdGAoDYX79mNART0QmAN75ZjW+tHoA1kQgg2oE00ESoBgHwmvi1UkMYOCO1'+
    'iTWXYwBS1xiJ5W43awlf+T9Ufy1fB3CTOjvw/aA/6A7S/pE7jmgOS+Dk4+kRXi+fzJXIsZ4OfLNY'+
    'ffamOXqvMuxQKAJ+kdKktN0K/wnBmo8D3MQDaPG1rkrTjxgCuHzE/1Tv8LLdAoLFesUvJA4DyFV0'+
    'AEDN1lpcP4LPub1b238iAYiJWQKATSLWi7VJQBg3AKp6aVOAzOUtVGZXEwV8jv0Y318+gR6I00MB'+
    'TCJYS8lVAxRA1BUDIJwz/sFLBTrZL+TN59evryoCev/kVKAagOYwxq0E+CVjJ0U6EhUFUAqyrwiw'+
    '8N/L6ys6XiTXqgMCXgAE/UfaVEEdAMDKJ8eMRh0tCrltMvKoZNfA+YVerRWoBEQHegmEKsg1xVYP'+
    'ABJpMgEQpRMAqpSvBuDV24HMUiABrFX92y6numnsHXHHqRAAXwWifXbK2uirYCABEMEmmQTIIHWt'+
    'ADuHCIC6KVBSHaoQEraM2hhYZNdTvb9ev1y/TNxfXswOEMCJLDfLTbLyqx2KVUDViz0nBsDd56w2'+
    'efokFXcOIpvIywTgGl5f6L20AroxsNgsk0nADFJXBdRPKNpDFntTamato44DXjCJdADIDnSmWATA'+
    'BmnWEKklFH1IVmLruXjLyIwJiErATDEBmG0FBnQOQOYvSCtQJzl2lqwD1tsTZxRawXFnlMMo7jP+'+
    'mFuBMyvJS+AogJMc83/rqMEtVh5b52YkX6ObztIBrG3fM04EaMUPfi9jdjY9IwDY1Zu9AVci9cW+'+
    'AKAKgMAYGqrdKR+QQPYlEG0aAcjN/ZvfJR0wi1/OZoKzdgyyKUjmKYHU0Or6EdnRHO+fmt9xDYBp'+
    'dDRbqxRTisaZP8ePywz1PgiHI3ZfGSf779MFcEuZKFn4ym6CaM50g8rfw49bWvRnfF8afpVs9xcA'+
    '7vuVe11U94XrKsdKBlMNP8jopKt8XCItdJ0H6NDTAUqDQrw/aDQB9N+XrhdXOHFnh6iVxW47kxjY'+
    'V3LnLRU+x2+yn4O/IvMG/Du6f641fJ91oFQ+FZq1m0wASGRVJETIqQRZJ2Wy2IdKAkUJ0AfWikpq'+
    'fl/aZph98+M7lwN2oIztQClH7ID/PXBAAEJTFTeZ9XNPK89GAi2jr0c6/H1xVHtEQp0K6OeeFm7I'+
    'nvqvdwAGvy9+HOIBpBMBlC8AKIPfJ+kYZNdByGKRi/RoQgcCLmf5uAy+zj5EfYn9Tn/vf/evOcrs'+
    'fIL2qcK4p3ftRfx7bpxCOKD3xL3oeJ9GHN2MVt/ni5MxYCllRDMDAEshANx9aMK0lqEAFEoz8OkB'+
    'cKd7HgBppZMA3yfL1N5QAIrFFX6xChIoOEFMCHKdB0D9kC0fcRRdm5GjE4B+QWtsre/YVGa0/VWV'+
    'oAEgblfGB1h+N5pUAHUoAEGzXq9g2BMkIDMqWUc+pVdC7VeIYSAAKoF2Wr0TAMPB6ZfVmrWXxn5q'+
    '5HlWVjl5AHR3h1ckwO3AAahDAfBXQAAkAgSy5lGR9n0kaNABKH62uvQ64AGUoQCIAw+7YRJoTeO/'+
    'WmwkRW57WAXQkj0AaYaNuEsr8rZKpOQqARm7cfcEu3rYDKtMghEVAAyotwOmhEHpWqXE0Rc1BdEB'+
    'Gr5L/yhr5K4BUOsIgBlVD6AOBYA3J/m7VpBJt7J0oyBARpNNhwF0dkANUTQ8rWFy1nuxWvt5Tek6'+
    'iiXMGqZQHcleN1wrWLsAajeT3Zjm3hLmWkPIpMjcTy+BYJgaO9A0vTIUAFRz7wWyn1fNZsvmnFGU'+
    'QDuAn4km6Y8PesNYUYfdcacDRw4KmFztZkf4FiGtOQju55mQs5/8/isHxIh2z58HcAucbwHAz/QT'+
    'XvT4dkPR2tvb25+HOJ/fSRgthtBPBnB7ywDOkgcA/AHB7e0RBAzgavcMUng+BqC9fktHOkv/IYDn'+
    'qfhXJ1QBhSpbCZyB+NMZkJMBiOhVAhCnu3r+PIB0+5MBeB38BsynF2Q+RDAAMF8BRwFMvKH8yOfv'+
    '/0UAf327SQBg+vzsBADPBGF3gg6YKykIAF+sEfzP338TgBv4d3t7Bv9+zjIWiqWflOC4BLhX1QCg'+
    'Opik8FUAIABsCl8EcIYHKuGRKjggAbBEJwPg/rVWQYqGqFfCuZI7O3BKKwgXSgRwuBkeAQBm+CQJ'+
    'FPo/AkAvXwTwTI1gdzIAM0RnPxXAWfq8JfQ5DCf4gh7A2U+UwFm0xKc7I+FPAviCL5h0/HbgDOf7'+
    'Ean+l2YsCsfrhHYAmmm1jmqMuXyJfepCQv8BgDyYJ2wOmVaZ/vhbVPJiEmj7cD3j7Gj5JIBFBJA0'+
    'fJl40Jr9eKA08YEw2UpU5pJljrkHEAsgSRVCC2UQEPVxPefUdGBRLElKJ2DiCMrPb5URgIXG0dbJ'+
    'whvVKCXV0QgSJ5lwfl/iCCSHyoFinsS2MaQbOBLNscqKJHVIXI+mMySYTHF9iWkzRUFnFrjELxIH'+
    'JFy00krq4xtcVTJFWpIhWPjBMAcsOAEqy+x+4UhCkil9TnBgXcmNrLObowvBLE2C0ZDmaqVUhqpu'+
    'yEr/Kk+eZtLuLKKU6Xqbtm+jadKa+AvyPabrBoCEuGQqV0UvSWldM+wMZZaglsz/54CrAbCCPwCw'+
    'IiqGyAxSdlmfo/n9zlBw85c6yFznuW++ZACAcWIAaQSgmV/vp+c1vai4MGDWAKPogsYFm6ppAPCM'+
    'jc7cfAaANPvM73PTCscAUpcDWh3tAfTxAZ3/LO2sdh2w66vwCIAuwvBPh+zJjxam9Q8f/45oiSat'+
    'FD8taPA4FytEs21iMVtQurpk/1z7aHacyXH8ckg8lBxhm2/PrH0WdeL3fvqtNks9qsUpwv10Gi9p'+
    'K9CMDE1v4RBK9ZHOmpTWMAWl9mkIQEy83o+VXflpyZSWcDOzzOYJ2EfUOQDVvs/RnKKFytUCXLk2'+
    'APSHTUmyB+Dm1EszHRdE7eUrUm7vW0NSjCiTu1lQJq4Bcwy5jgCoaZTkBI7ju9KLzuXi+oSpTYpR'+
    'AJYVxwCq6ECMD8SCnAKg+rQgXxUpDatATbPWdRlWga/KQ1UQm4/WyQEltPCLY6SRkUErKIeVMIX2'+
    '65phmmuGTXv3APw9vES1p9U0ww7AKYYopWiIQitok9ylvhMlKuj3nSGyzKrSmMbUmOIQoGBlbH+X'+
    'VUl9lEyrQL9vlv9rg8vf74j+sDv+U/6/jy/8k55+MJPiAbS9SpfcSlrk/0elEotW/eh6DKDJk3AA'+
    'pENRYhJL1fYm9kEy9KxZVX+9jKYIZgGETqIaQPWOakV7d+0Ni7+eh2GqWQA2u64OQk2ljn8otSta'+
    'Sq0C77wEQE1fAdA4FwvLOxNbvK/XLpQZnjIXpzsBQC2Nc6m1Cb87cM69qsEsLlUhfUEHDEAzSD0G'+
    'IFsHRuZu0mckILPrXsQlzCwcqQLXhQvZO58GwIkP5l5FDXJpOyy16WRql6rMtLBTAGg3uag2BwCu'+
    'o5K9fXDfNzDlK3Ygq/9Psmhx5OfNYOlAI3RMavmcHXCz61VW2agfHw+hzGRLGxATHDq3nwfwR5xR'+
    'iLD8vxuOh9njO4nCE71rjjCtdWy94RsRWX/n1+E1qYBGkQVxxv8jADNp/G2OYfrOVNbf2To8XpOM'+
    'pJl9pyLeJZHCOfH9lYR+QgIigOuXF09T+rHffyjBJb7FKBddZJCk4OcGoGRNt8e+QMkp+RmRRgCy'+
    'ANAWAu4TAiDie0mpWtXTmztm7JWDR52a3y5VaLKh5fBvsiy+r4IfeyO8Bjizo1Hu6e7XuQL45XNE'+
    'Ki0czthLo7UlleMFMAv8BgC+v4EACMArLjszCmX/8aFEuglcjjtVAaoAEYkDUKgOcHmALBlwg1AB'+
    '8M4SuAbtfzFKZf9Q4tZtHQaQVAWcEiQDIHXxBrX//e17eicteIFFX279mQcAK6NdBIh5G4DEAH4F'+
    'AJY4VRrdK1z1tBz++0TeoOD4RzCuufE5ANlEMAZw3gJgAYjspBVI3+yNGKdEQIg5sX+B93tYkT6p'+
    'PzbC/UdOIY2giPLdqTVSALThwtH1hu/vshZ9opMuvNAfAUgvPwDAB/AmIDqBzhE1aX5W+bLRg7w5'+
    'tt7w/a0DYFIAAB8/AIAAySn5bWHKXWOJkq2zPzczcGi94Ztui4GtwXSAIEDbJwAEJBe/FpHsQFIV'+
    'SHcOgGy78bn1hiR4qP5rWoM6HO+7N84RycuvCOC3++IwyLV2b365AbDisPIcPd7r8d3HMJd02rHm'+
    '7Mo5erzMJQwh4kKRoHaiTHHvFcmrnKN++spNSTlb5aNMbsmJiqDd34OTSOT6ak2xfaCrhi78QCWO'+
    'WgKA6mfmw5oWsYbfoTlP5hy2fbnhnS+4aWBkkelicC6T2kkWKPlhkyTy2tRBE3w7B0M4iRrsKUgA'+
    'U7kmCdD1O0nUXTFdNBQ/kAFU1UXyLg6Qi++DVIPD8XDtfxB/TiP6y/oltE57wXTFFN4IleB5lTET'+
    '508jIAr7V9kGhi0ow0KqjL6TCnyjPCbXIUJlo+g2AvDnCEA3B9DBZOEJXNqFiuL7uC5Rd1Yotg3U'+
    'eQSgiUznIwCL1NPMKzTBS5K7DEMxXAmZi9JKCw+wfvAL0gdDLXjrAUBmw2qBKetE10oXQG3ZRMlx'+
    'KqRoRgeLvNC4FfkSVQB3DEC04C8DNjFeQFQbAazc+ZpolT0xtNnlFADIvgpZUkFylfmsKq39/E52'+
    '+0IrgDKQ/vl6YshJJkRXSmkfg7CZVulThuJafR/jQKM1VAEGgCbSZbksfLaLApgx/ykGy73ptfh5'+
    'LtIBkn7VN5K/65BhnR+gQ5fit1dLHYDqzJR0wL5zv+4b89eOWYJNG9YH6HEAuaSwyVnwDeczTl+v'+
    'c33P0lOccW2qpR6YNusOylnlpE2hyc7/8cmEBsDznwLwDOm7V5REbEAolTM36/Fbyjiv8NuGucmE'+
    'reYqAvWMdw29YgBhDle2lNOt5WQHM1gGIK92NfQV64AmSdo1SrnMCGTX51LlGqkuQNGd3HYpvJkr'+
    'una/HQDRB68XXTJXaahsFCYJ6JqITtfzXNqhtRFjmLQqDUhKTR+rpVcKYEhlvWHWaAx4VfQobDGF'+
    'o/CTgmtCtayKzSH1U4dQuyuq9asryv9uaLtOvl837xgKVSQ7m5uVNZE6lyQdlJ0WYEhlud8c7QEk'+
    'u8H0RvZU4E6hzzIlejVJYBdsiZwTPQrgqlG+FM8psiPT6EMAiRmOqSz3m6PA7+qZ6U7oMxunnZNA'+
    'w1g6RtO38QZz9AQAiHQnKzlwe1Zc3SR63OX7+Z7/FcLczVJdbzhHzQoG8e0UyCwAaZdXz9zsxrSO'+
    '9idxtFGgkTecAcBxIyxtSmaEBUBjimed0a5pOmKNDECbcGiJh0BRgs/k1piG03//gTss8XZvdAFO'+
    '+Hp6HHRLbWvaYYf1IV3cA51eH07gf4nbrF0Cq4kibzyn63BBM7mqbXLlI7UPiRhd3BPjzwOAbb7g'+
    'b6LAls71upbU5n5i37wFcJES0un1vk1oHSF49ABADs35cDDgj4nLPTBnxg8J3kH5FUAfAfEueWJ4'+
    'ySW/ZADhPE4GtZNDiRgLABS7Argg0eQ4+ezOqTU9PdFWa0CfBucaKtV8fN1ZbDoFlg9Q1AegD/dT'+
    'DTygFiB9ML6ZB5l6hZcNoPo/HaJtPL+J4V48TAfqgqMP90Tvk09hz9UH5wXAU6ICo9I9MQ3X2w1Y'+
    'Szy/uH8g5XtgJXx48NQBSGUA4FJETeSR6JNdb3Prmxh2x9CA3HcA0hDAJTKeo7lNHw4agEqIosea'+
    'eEjJquQiVoFbplT9GF/ae7QHvhmaB8qDveAvHu5R+aIy3st1N5eQUxMPLWKK0QB1AC47O9AZhOr0'+
    'IBglaARsFQfWp90A75JbH9NHEr1ed0a/dvPxvR8IeE70Rq7dP7LyPbrr/RKGI97ok8cla/sc/e0M'+
    '/33H0dH33EaEuZ7yMQT2PuIbpnLaLfPpMqrCdoHt1nFHAWA4zb9hqtd5gVP1NAyKs9t0J0l8Uedw'+
    'jwHguKa9YarXjwMIa9d8aLXYdoZlZvxdMJ4oBd5zgHPPcUapA1qA4GnwQW0YL9LMy/xys70pX/+x'+
    'p7rG+CICISrXXczYUz9y6EocJdLsTxhpkdwGpZJvoufDxShhCWizYaJKoHCsm7cxlGl9T7MxVGoZ'+
    'L3udau13t3Q6kUebUrpWiju90UJU3stRKa2+2jetLjWN4hiAY2ouD43IAwloO/zw1NkDzHoZtf/K'+
    '12s6NL10kp3aY4V/kPIxZz7nxIe50bdtr3eYQ7M/YUP3zEho8uc/qA56xmEbr3b/v5Z2uwkGuucS'+
    's+4rY+Of/O5Vofmr6SODp77B7aGZR3gCNfsTGe+dVjYZ2V3WQHNnx3GwP6FfnlhbDyCGMHiCU4Lj'+
    'oQ/mOH7qMCAfwS78+cMWn9WwlXM9dYcB1+/Ge/XL8c/v/kkAlgddeUvY3OSgnNvORnZYLMkDkO1d'+
    'OZf7NACyCVeVfQmqbss1D+DcLln7r5qE4ZMx6sw2VzVWQeVNdysv63dVcARA4wMCTXH9WQxYxoEG'+
    'b+RL++lGEz7UAVcF0Q0HegoAt5FyzbasvzRraGaThnxHxOeq+2WAh6pAGOvOzMy4xEzr87u72cBj'+
    '7AsGGtZ4VTeuNu9Zc0jtCCkfbu11ABCqpNe5kJPTMWwBofaPAKQAIFRBoxO1HqbqdpXKyoPsNlIO'+
    '+5Qk2+TiJENy0sCkOCrNTErOSuQk0D2z4pAhOdIhkeWGjmbOpuFQDuUj6h4ZubpHY/znANr9gI9s'+
    'J9x9fqozmqXGqAMQFq+2n9f0m0bzsk+ArC0TH8EX/Nb1/nM9P/WwzUXKn1mJqQBKGSP46vqINW8r'+
    'uV4t1pw4Fc5Du0UA8oSTqMT5a0+AwlwQfrQIP2KEsmPkfAxAH6RgWeKaTddIYsu7ni7lYSL6hj6B'+
    'vCza41Qo7znL57Y1S5L1TlW2l9dhNwevS+5XVi4FgD7NRN4sTwbAvW7t/mfZ5IT2yS8W6ZQgtpeE'+
    'FTj5N8vpIACJHm2jdEEZU5AotdL9gYxmycYt+nQfKTk9v6yVhBU4yGS5lOebMCNl3ACaSk7j/kLj'+
    '/yw2vRTrl1RX4k4SWgcbX/dLgWRKN6ZU91nrPFsfT+ILVHJ7AkuUhIpgoAQpNLsZKnVddDf6uAWN'+
    'aX271oze4POciO8Gyj0Jf2K8YSCbpBssz1F5YAJTlYDb4SEuKW0kAQ9UAkbwaCkEsAEl2CAQpGva'+
    '3XctW17zOVLfDNUOzAJoOjAqmanoS2A1UWoA2y02AKKLFfyh0iGVc3wlAOMHJrjrtY/WeWDbJdX6'+
    'llv+ckPnRNe0w/MCAITmiNdX/hFS8XkFdn1mGKz7kG9Z77dsCrb8jCmkC2JIam/+YEXXI6M5ALN+'+
    '+ve4+zLTwylHezT5N7ntJTUaofCILHxMllzXTbbn6LEDAmKH6JIbMlNQKdTmpTVwqNwtG5ittzzb'+
    '02JCEiRPl3ZudHIaVPKJLie2QKEF0znyntQbNBwYLhEdAUKzf4FR2nsNVHkK1yEIRckJE+WgFAXj'+
    'BAALfAsUGW2WyFDPwcCAQm8RiFC+fvEAAcMHiBNCqDJQjGA+PT49QUoE0Uc5n0QyUapJvDvem24c'+
    '6SbZeXKX+AQitRwxTRgqNUrXJzaPEJlkyucQFJvoI1tsKAvRTU8jwxaQBMmThG49vZfgGwIIVGLU'+
    '+nzCJdENmC8woXZOFe4ovhWKMeKUZulRAMqItB/lTq9yjspGdg6rKqLA6DEzHFFjDI+kGwBRRnMA'+
    'QOOgPTZUr2OwmuK2I6qMgSW+RiBYom1i7YbqZT8u50meIDlHL0QHJH8ghfNLav+PHZVmuSQurFEI'+
    'AASr52nLPQ6im4ZivPpCIuaofBcJUknkXBlSu++ApLbk0qXS8yU/QpPopqHO6DC9uA9h/Et6HOFj'+
    'R7lKiDXUOdn+jfgAPV9yiZfcJgJlb6HhektqkvNLKu0jWCSwP5dEH/V6y5i5GwWLt8VaIqEHuqRK'+
    'EK3T3C1JX0A1fKQ0tSd7Ti4CUQBkdhNR6stC5QrdovvZME0N9e3Q3qQHd04lx8w0zJNjKtenkk62'+
    '31F42WyUQnMjO7BkVXB0OfaGBgTd4OMl2Hx4eXw0ytf/D9PoVho2QzPVAAAAAElFTkSuQmCC';

  var rleMapData = 
    "+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4"+
    "+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Oih+Pj4+Pj4+Pj4+Pj4+Pj4+NCx+Pj4+Pj4"+
    "+Pj4+Pj4+Pj4+MCpApnomZih+Pj4+Pj4+Pj4+Pj4+PjoqZKZoLGQ8cip+Pj4+Pj4+Pj4+Pj4+NCp"+
    "ktmS+bGYyfj4+Pj4+Pj4+Pj4+PjAqZTRmqmS+Zmiofj4+MDB+Pj4+Pj4+Pj4sKmU2ZMCkaIek/mS"+
    "kZKh+Jih+ODx+Pj4+Pj4+Pj4kKmc0ZupmgOt+QGSmfgAwfjA+Zn4+KDB+Pj4+Pj4mKmUoQCpkwTR"+
    "xcmTmZKR8OH4kMnKscix8PH4+Pj4+PCpnJmQoaThlZ6tmauZApHgsaKp8JnKCAgICAgICJqpsNHI"+
    "+ZH4+Pj4+PChpJmQoaTplbalBKuRApmYmaCxkpeiocihmqcICAgICAgICAgICAiXAqmQ8bjRnLH4"+
    "+Pj4+OihrJEAoaS5kLGVxpWckwGS2QCpmreamdChmq8ICAiXCAgICAiXBPGUqbC5xKH4+Pj4+OCh"+
    "tLGsqaixnb6dBAP5sQKnCAgIn5KZ2KGixwgICAgIB5TJmgSVBKGosdSh+Pj4+PjgoZasoayxuKmV"+
    "xp35sZ2XCAgICAgIl5KZ4Kman5SXCAgICAgHBMGSBwSdBKGoqdSp+Pj4+PjgoaackZWsqcCplcad"+
    "2QOUsa2nCAgICJcCoeipkpekBwgICAgHlLGSl50Eoaip3Kn4+Pj4+NihvpQCnaSpuLEElbad2ZOk"+
    "kc2fCAgJBwiSmeipkp+UCgQHCAgICAcEqZKflQSpoLHUqfj4+Pj42Km+lQKlpKG4qZyVpqXRo8TF"+
    "lwgICAgIApnwoQKvnJcICAgHBJman5WUoaCx3Kn4+Pj4+Nihvp0CrZypqKmsxdmTmdytnwgICJKZ"+
    "6KEClwKXlJ8ICAgHBAORAq+cqZix3Kn4+Pj4+NipvgWatZyhmLm8pZT5keSlnwgICAKZ8JmitwgI"+
    "CAgHmwKvpKmQqdy5+Pj4+PjYqa6dFwUCnZ4FlOns+aHsnZ8ICAKZ8KGSnwgIlwgICJeTmqec0ZLc"+
    "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"+
    "ArmQsfz09QKVsfj4+Pj4+Ln4+LChAgGklc6dqfi4oZIHlNHctezdop2p+Pj4+Pjwyfj4qKECAaQF"+
    "zqWh+MCpl5zJzN3ctaq9ofj4+Pj46Nn4+KCZApGclbYFAqUCmfjYmZ+cybSRms3c/ZWh+Pj4+Pjo"+
    "2fj4oJkCkZwFvpKlApn44JmfktGcoZWiBZqV7P2p+Pj4+PjYsZOh+PiomQKRBJW2lZKVkqH42KEH"+
    "kp+pAsGdApWarfTFlKWh+KH4+Pj4uKmXA6H4+KiZApEEBb4Claqh+OCplwSXoZKpnJWSnZKt7L2s"+
    "langwfj4+PioqQeVofj4qJECoQW2kgUCoZKh+OChBJWfkZKZvJUCpZqd5MW0BanQ2fj4+PigoZcF"+
    "qfj4qJkCmQW+mgEAAaKh+NihBAqdB6nMlZKdAgUCpczdvKnAuQSp+Pj4+JihB5Wh+Pi4kQKZBcaS"+
    "AZACBQSSofjYoZQFqdydAp0CtcTlxKmwwZSp+Pj4+JChlan4+LiRApGdlgKmlQKRApUEAqH42KGU"+
    "oZ/M/QW07cS5kKmUmZyh+Pj4+JjJ+PjAkQKRBJ2SrpUCAZIFlKH44JkEmZ2nvKWezbTl1OmcmZyZ"+
    "+Pj4+JjJ+PjAAQKZBJ0XBa6dmpUEofjgsZSlnwSXlKW2xazV5PEEl5GXBKH4+Pj4mLn4+MCRApGc"+
    "BZGVnqWiBQSh+OCxpJWvnJ3GpQKVtL308Z+Rn6H4+Pj4qJn4+NCZAgGcBZm9uqH46Km8r5SVzqUC"+
    "lcSdtJ3EsQWpn6GXofj4+Pj4+PiYmZKUAwKhparB+OipxK+V1qUCnfS1vKmVB6GXsQeh+Pj4+Pj4"+
    "+JihAgSTAqEFCgWqwfjwscS31qUCneTFvAWhlZeZB+H4+Pj4+Pj4oJmSA5KhnZrJ+PgAubyXldat"+
    "Ap3U1byVkZ2XwZep+Pj4+Pj4+KihmpmSAwWawfj4oMGspdaVApUCpcTVvJ2RlZ+5n6H4+Pj4+Pj4"+
    "uKGSmQKbmrH4+MC5rJXelQIFkgUClbzVtLUClaepn6n4+Pj4+Pj4uKGSmQKTmpWh+PjQsayV1p2a"+
    "lQKVtNW0rZqdn6kHlKH4+Pj4+Pj4wKECA5mqA5Wh+PjYsaSdxrUCBZKVrM28tRcFkpWnoQcEqfj4"+
    "+Pj4+PjAmZIDAqGSkwWh+PjoqaQGpZ6XvZqdrLXMpaKVAp2f2fj4+Pj4+Pi4oQKTkpmSAwWh+Pjw"+
    "qZymtZ+lkqWstdSdkpUClRell+H4+Pj4+Pj4sKECmwKZApMFofj4+KkEvq2fnRedvKXknQKVkpWa"+
    "nZeZB5Sp+Pj4+Pj4+LChkpMCoZOh+Pj4kKnun5UCBdSV7LUClZIFAp2cDJecofj4+Pj4+Pi4oaLR"+
    "+Pj4kLHunwWRlJ/8tKWSBZKVApWkl6Sh+Pj4+Pj4+Lj5mfj4+Ji5/pmWp/ysnQKVApWSlZyfnKn4"+
    "+Pj4+Pj4yPn4+Piwue6Znq/8pK0ClQKVpJekqfj4+Pj4+PjY2fj4+MjB1pWZptfkpZKlpJekqfjo"+
    "mfj4+Pj46Kn4+Pjoyc6Vma7f3MXcqfjgqfj4+Pj4+Pj4+PgAyb6dobafCAgIt8S15LH42Ln4+Pj4"+
    "+Pj4+Pj4AMG2paG+nwgICAjHpK3sqfjgmQiZ+Pj4+Pj4+Pj4+Ji5rq2hvp8ICAgICAjHteQDqfjY"+
    "mQgIofj4+Pj4+Pj4+PiYsQemraHOnwgICAgICAgIn8XUA7H42JkIlZn4+Pj4+Pj4+Pj4oKmXnq2h"+
    "1p8ICAgICAiX3cSTufjImQgIBQSZ+Pj4+Pj4+Pj4+KCpApeenbHOlJ8ICJ+lkrW0o7n4yJkIlQSZ"+
    "+Pj4+Pj4+Pj4+KihAp+elbHGnLe9ApWalaSjwfjImQgFlJn4+Pj4+Pj4+Pj4qKGSn57BrrSnpbKd"+
    "ApWcm5mTsfjAmQgFDKH4+Pj4+Pj4+Pj4sKECn57Bpryf1bKVBJOZo7H4wKEFBKH4+Pj4+Pj4+Pj4"+
    "sKGSl57JnrSnBdIFApWiuQO5+MiZBZSZ+Pj4+Pj4+Pj4+LihAp+WyZa0nwgHxQKdAp0Ck5mbyfjI"+
    "oZSZ+Pj4+Pj4+Pj4+LihAp+ewcSXCAiXnaqVkgWam5mTAZOx+NC5+Pj4AKH4+Pj4+Pj4oJmSn5bB"+
    "vJcICAiXzZKVAgWUk7GTsfjYsfj46MH4+Pj4+Pj4mKECn5bJtJcICAgIl+2cmwGT0fjgofj44Nn4"+
    "+Pj4+Pj4kKECp5kCsbSfCAgInwTNtJMBkwGTsfj4+PjwqQgICJn4+Pj4+Pj4AKmSn5GSubSXCAgI"+
    "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"+
    "+Pj4+Pj4+Pj4+PiY";

  function rleDecode(data) {
    var buf = "";
    for (i=0; i<data.length; i++) {
      c = data.charCodeAt(i);
      if (c >= 128) {
        code = c & 7;
        n = (c>>3) & 15;
        for (j=0; j<n; j++)
          buf += String.fromCharCode(code);
      } else {
        buf += String.fromCharCode(c);
      }
    }
    return buf;
  }

  return {
    tiles: tiles,
    worldMap: rleDecode(atob(rleMapData))
  };
}());

ultima4.main = (function() {
  function getMapTileAt(x, y) {
    return map.charCodeAt(y*256+x);
  }

  function drawTile(g, tile, x, y) {
    g.drawImage(tiles, (tile%16)*16, Math.floor(tile/16)*16, 16, 16, x, y, 32, 32);
  }

  function drawViewport(g, mapX, mapY) {
    var ox = 16 + 5*32;
    var oy = 16 + 5*32;
    for (var y=-5; y<=5; y++) {
      for (var x=-5; x<=5; x++) {
        drawTile(g, getMapTileAt(mapX+x,mapY+y), ox + x*32, oy + y*32);
      }
    }
    drawTile(g, 31, ox, oy);
  }

  function repaint() {
    var g = canvas.getContext("2d");
    g.fillStyle = '#fff';
    g.strokeStyle = '#000';
    g.fillRect(0, 0, canvas.width, canvas.height);
    g.strokeRect(0, 0, canvas.width, canvas.height);
    drawViewport(g, state.x, state.y);
  }

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

  function keyDown(e) {
    switch(e.keyCode) {
    case dir.up:
      if (canMoveTo(state.x, state.y - 1)) {
        state.y--;
      }
      break;
    case dir.left:
      if (canMoveTo(state.x - 1, state.y)) {
        state.x--;
      }
      break;
    case dir.down:
      if (canMoveTo(state.x, state.y + 1)) {
        state.y++;
      }
      break;
    case dir.right:
      if (canMoveTo(state.x + 1, state.y)) {
        state.x++;
      }
      break;
    }
    repaint();
  }

  function createCanvas() {
    var canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 480;
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

  var dir = {
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
    mountain: 8
  };

  var state = {
    x: 86,
    y: 108
  };

  var map = ultima4.gameData.worldMap;
  var tiles = createTiles();
  var canvas = createCanvas();

  document.write("<body>");
  document.onkeydown = keyDown;
  document.body.appendChild(canvas);
}());